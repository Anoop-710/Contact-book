import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// @desc Register a user
// @route POST /api/users/register
// @access public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  //   console.log(hashedPassword);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log("User created: ", user);

  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data not valid");
  }
  //   res.json({ message: "Register User" });
});

// @desc Login a user
// @route POST /api/users/login
// @access public

const loginUser = asyncHandler(async (req, res) => {
  // When user tries to login, send email and password in request body
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({ email }); // To check if user exists in DB

  // Compare password that is stored in DB with password that we received from client
  if (user && (await bcrypt.compare(password, user.password))) {
    // Compare password (client) with user.password(hashed password in database)
    // If matches, provide access token in the response
    const accessToken = jwt.sign(
      {
        // payload to embed in the token
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1000m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password is not valid");
  }
});

// @desc Current user info
// @route GET /api/users/current
// @access private

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

export { registerUser, loginUser, currentUser };

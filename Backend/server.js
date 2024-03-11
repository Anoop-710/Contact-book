import express from "express";
import dotenv from "dotenv";
dotenv.config();
import contactRoutes from "./routes/contactRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import connectDb from "./config/dbConnection.js";
import cors from "cors";

connectDb();
const app = express();

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

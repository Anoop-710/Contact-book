import asyncHandler from "express-async-handler";
import Contact from "../models/contactModel.js";
// @desc Get all contacts
// @route GET /api/contacts
// @access private

export const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

// @desc Get contacts by id
// @route GET /api/contacts/id
// @access private

export const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

// @desc Create new Contacts
// @route POST /api/contacts
// @access private

export const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is:", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

// @desc Update contact
// @route PUT /api/contacts/:id
// @access private

export const updateContact = asyncHandler(async (req, res) => {
  const contact = Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  // if (contact.user_id.toString() !== req.user.id) {
  //   res.status(403);
  //   throw new Error("User not authorized");
  // }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});
// @desc Delete contact
// @route DELETE /api/contacts/:id
// @access private

export const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User not authorized");
  }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

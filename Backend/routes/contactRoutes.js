import express from "express";
const router = express.Router();
import {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from "../controllers/contactController.js";
import validateToken from "../middleware/validateTokenHandler.js";

router.use(validateToken);

router.route("/").get(getContacts);
router.route("/:id").get(getContactById);
router.route("/").post(createContact);
router.route("/:id").put(updateContact);
router.route("/:id").delete(deleteContact);

// Can be simplified
// router.route("/").get(getContacts).post(createContact);

export default router;

import express from "express";
import {
  getAllUsers,
  getUserId,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user_controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserId);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;

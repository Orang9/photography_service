import express from "express";
import {
  authenticateToken,
  authenticateAdmin,
} from "../middlewares/auth_middleware.js";
import {
  getAllUsers,
  getUserId,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} from "../controllers/user_controller.js";

const router = express.Router();

router.get("/", authenticateToken, authenticateAdmin, getAllUsers);
router.get("/:id", authenticateToken, getUserId);
router.post("/", createUser);
router.post("/login", loginUser);
router.put("/:id", authenticateToken, updateUser);
router.delete("/:id", authenticateToken, deleteUser);

export default router;

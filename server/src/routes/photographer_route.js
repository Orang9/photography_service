import express from "express";
import { authenticateAdmin } from "../middlewares/auth_middleware.js";
import {
  getAllPhotographers,
  getPhotographerId,
  createPhotographer,
  updatePhotographer,
  deletePhotographer,
} from "../controllers/photographer_controller.js";

const router = express.Router();

router.get("/", getAllPhotographers);
router.get("/:id", getPhotographerId);
router.post("/", authenticateAdmin, createPhotographer);
router.put("/:id", authenticateAdmin, updatePhotographer);
router.delete("/:id", authenticateAdmin, deletePhotographer);

export default router;

import express from "express";
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
router.post("/", createPhotographer);
router.put("/:id", updatePhotographer);
router.delete("/:id", deletePhotographer);

export default router;

import express from "express";
import {
  getAllResults,
  getResultId,
  createResult,
  updateResult,
  deleteResult,
} from "../controllers/result_controller.js";

const router = express.Router();

router.get("/", getAllResults);
router.get("/:id", getResultId);
router.post("/", createResult);
router.put("/:id", updateResult);
router.delete("/:id", deleteResult);

export default router;

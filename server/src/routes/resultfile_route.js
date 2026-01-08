import express from "express";
import {
  getAllResultFiles,
  getResultFileId,
  createResultFile,
  updateResultFile,
  deleteResultFile,
} from "../controllers/resultfile_controller.js";

const router = express.Router();

router.get("/", getAllResultFiles);
router.get("/:id", getResultFileId);
router.post("/", createResultFile);
router.put("/:id", updateResultFile);
router.delete("/:id", deleteResultFile);

export default router;

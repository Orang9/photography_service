import express from "express";
import {
  getAllResultFiles,
  getResultFileId,
  createNewPhotographer,
  updateExistingPhotographer,
  deleteResultFile,
} from "../controllers/resultfile_controller.js";

const router = express.Router();

router.get("/", getAllResultFiles);
router.get("/:id", getResultFileId);
router.post("/", createNewPhotographer);
router.put("/:id", updateExistingPhotographer);
router.delete("/:id", deleteResultFile);

export default router;

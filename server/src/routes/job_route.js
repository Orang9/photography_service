import express from "express";
import {
  getAllJobs,
  getJobId,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/job_controller.js";
import { validateRequest, jobUpdateSchema } from "../middlewares/validate.js";

const router = express.Router();

router.get("/", getAllJobs);
router.get("/:id", getJobId);
router.post("/", validateRequest(jobUpdateSchema), createJob);
router.put("/:id", validateRequest(jobUpdateSchema), updateJob);
router.delete("/:id", deleteJob);

export default router;

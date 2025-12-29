import express from "express";
import {
  getAllSchedules,
  getScheduleId,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "../controllers/schedule_controller.js";

const router = express.Router();

router.get("/", getAllSchedules);
router.get("/:id", getScheduleId);
router.post("/", createSchedule);
router.put("/:id", updateSchedule);
router.delete("/:id", deleteSchedule);
export default router;

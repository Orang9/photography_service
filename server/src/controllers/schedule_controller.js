import {
  getSchedules,
  getScheduleById,
  createNewSchedule,
  updateExistingSchedule,
  deleteExistingSchedule,
} from "../services/schedule_service.js";

export const getAllSchedules = async (_, res) => {
  try {
    const schedules = await getSchedules();
    res.status(200).json({
      success: true,
      data: schedules,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getScheduleId = async (req, res) => {
  try {
    const { id } = req.params;
    const schedule = await getScheduleById(id);
    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: "Schedule not found",
      });
    }
    res.status(200).json({
      success: true,
      data: schedule,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createSchedule = async (req, res) => {
  try {
    const schedule = req.body;
    const id = await createNewSchedule(schedule);
    res.status(201).json({
      success: true,
      data: { schedule_id: id, ...schedule },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const schedule = req.body;
    await updateExistingSchedule(id, schedule);
    res.status(200).json({
      success: true,
      message: "Schedule updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteExistingSchedule(id);
    res.status(200).json({
      success: true,
      message: "Schedule deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

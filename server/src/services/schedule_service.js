import {
  findAllSchedule,
  findScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "../models/mysql/schedule_model.js";

export const getSchedules = async () => {
  return await findAllSchedule();
};

export const getScheduleById = async (id) => {
  return await findScheduleById(id);
};

export const createNewSchedule = async (schedule) => {
  return await createSchedule(schedule);
};

export const updateExistingSchedule = async (id, schedule) => {
  await updateSchedule(id, schedule);
};

export const deleteExistingSchedule = async (id) => {
  await deleteSchedule(id);
};
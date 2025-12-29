import {
  findAllJob,
  findJobById,
  createJob,
  updateJob,
  deleteJob,
} from "../models/mysql/job_model.js";

export const getJobs = async () => {
  return await findAllJob();
};

export const getJobById = async (id) => {
  return await findJobById(id);
};

export const createNewJob = async (job) => {
  return await createJob(job);
};

export const updateExistingJob = async (id, job) => {
  await updateJob(id, job);
};

export const deleteExistingJob = async (id) => {
  await deleteJob(id);
};

import {
  getJobs,
  getJobById,
  createNewJob,
  updateExistingJob,
  deleteExistingJob,
} from "../services/job_service.js";

export const getAllJobs = async (_, res) => {
  try {
    const jobs = await getJobs();
    res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getJobId = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await getJobById(id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createJob = async (req, res) => {
  try {
    const job = req.body;
    const newJob = await createNewJob(job);
    res.status(201).json({
      success: true,
      data: newJob,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = req.body;
    await updateExistingJob(id, job);
    res.status(200).json({
      success: true,
      message: "Job updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteExistingJob(id);
    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

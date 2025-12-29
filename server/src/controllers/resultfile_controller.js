import {
  getResultFiles,
  getResultFileById,
  createNewResultFile,
  updateExistingResultFile,
  deleteExistingResultFile,
} from "../services/resultfile_service.js";

export const getAllResultFiles = async (req, res) => {
  try {
    const resultFiles = await getResultFiles();
    res.status(200).json({
      success: true,
      data: resultFiles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getResultFileId = async (req, res) => {
  try {
    const { id } = req.params;
    const resultFile = await getResultFileById(id);
    if (!resultFile) {
      return res.status(404).json({
        success: false,
        message: "Result file not found",
      });
    }
    res.status(200).json({
      success: true,
      data: resultFile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createNewPhotographer = async (req, res) => {
  try {
    const resultFile = req.body;
    const id = await createNewResultFile(resultFile);
    res.status(201).json({
      success: true,
      data: { file_id: id, ...resultFile },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateExistingPhotographer = async (req, res) => {
  try {
    const resultFile = req.body;
    const id = await updateExistingResultFile(resultFile);
    res.status(200).json({
      success: true,
      data: { file_id: id, ...resultFile },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteResultFile = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteExistingResultFile(id);
    res.status(200).json({
      success: true,
      message: "Result file deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

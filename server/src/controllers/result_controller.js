import {
  getResults,
  getResultById,
  createNewResult,
  updateExistingResult,
  deleteExistingResult,
} from "../services/result_service.js";

export const getAllResults = async (req, res) => {
  try {
    const results = await getResults();
    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getResultId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getResultById(id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result not found",
      });
    }
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createResult = async (req, res) => {
  try {
    const result = req.body;
    const id = await createNewResult(result);
    res.status(201).json({
      success: true,
      data: { result_id: id, ...result },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateResult = async (req, res) => {
  try {
    const { id } = req.params;
    const result = req.body;
    await updateExistingResult(id, result);
    res.status(200).json({
      success: true,
      message: "Result updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteResult = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteExistingResult(id);
    res.status(200).json({
      success: true,
      message: "Result deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

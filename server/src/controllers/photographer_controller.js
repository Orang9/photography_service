import {
  getPhotographers,
  getPhotographerById,
  createNewPhotographer,
  updateExistingPhotographer,
  deleteExistingPhotographer,
} from "../services/photographer_service.js";

export const getAllPhotographers = async (_, res) => {
  try {
    const photographers = await getPhotographers();
    res.status(200).json({
      success: true,
      data: photographers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPhotographerId = async (req, res) => {
  try {
    const { id } = req.params;
    const photographer = await getPhotographerById(id);
    if (!photographer) {
      return res.status(404).json({
        success: false,
        message: "Photographer not found",
      });
    }
    res.status(200).json({
      success: true,
      data: photographer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createPhotographer = async (req, res) => {
  try {
    const photographer = req.body;
    const id = await createNewPhotographer(photographer);
    res.status(201).json({
      success: true,
      data: { photographer_id: id, ...photographer },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePhotographer = async (req, res) => {
  try {
    const { id } = req.params;
    const photographer = req.body;
    await updateExistingPhotographer(id, photographer);
    res.status(200).json({
      success: true,
      message: "Photographer updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deletePhotographer = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteExistingPhotographer(id);
    res.status(200).json({
      success: true,
      message: "Photographer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
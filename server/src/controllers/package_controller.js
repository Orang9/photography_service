import {
  getPackages,
  getPackageById,
  createNewPackage,
  updateExistingPackage,
  deleteExistingPackage,
} from "../services/package_service.js";

export const getAllPackages = async (_, res) => {
  try {
    const packages = await getPackages();
    res.status(200).json({
      success: true,
      data: packages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPackageId = async (req, res) => {
  try {
    const { id } = req.params;
    const packageData = await getPackageById(id);
    if (!packageData) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }
    res.status(200).json({
      success: true,
      data: packageData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createPackage = async (req, res) => {
  try {
    const packageData = req.body;
    const id = await createNewPackage(packageData);
    res.status(201).json({
      success: true,
      data: { package_id: id, ...packageData },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const packageData = req.body;
    await updateExistingPackage(id, packageData);
    res.status(200).json({
      success: true,
      message: "Package updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteExistingPackage(id);
    res.status(200).json({
      success: true,
      message: "Package deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

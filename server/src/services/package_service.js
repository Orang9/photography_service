import {
  findAllPackage,
  findPackageById,
  createPackage,
  updatePackage,
  deletePackage,
} from "../models/mysql/package_model.js";

export const getPackages = async () => {
  return await findAllPackage();
};

export const getPackageById = async (id) => {
  return await findPackageById(id);
};

export const createNewPackage = async (packageData) => {
  return await createPackage(packageData);
};

export const updateExistingPackage = async (id, packageData) => {
  await updatePackage(id, packageData);
};

export const deleteExistingPackage = async (id) => {
  await deletePackage(id);
};

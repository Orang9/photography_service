import {
  findAllResultFile,
  findResultFileById,
  createResultFile,
  updateResultFile,
  deleteResultFile,
} from "../models/mysql/resultfile_model.js";

export const getResultFiles = async () => {
  return await findAllResultFile();
};

export const getResultFileById = async (id) => {
  return await findResultFileById(id);
};

export const createNewResultFile = async (resultFile) => {
  return await createResultFile(resultFile);
};

export const updateExistingResultFile = async (id, resultFile) => {
  await updateResultFile(id, resultFile);
};

export const deleteExistingResultFile = async (id) => {
  await deleteResultFile(id);
};

import {
  findAllResult,
  findResultById,
  createResult,
  updateResult,
  deleteResult,
} from "../models/mysql/result_model.js";

export const getResults = async () => {
  return await findAllResult();
};

export const getResultById = async (id) => {
  return await findResultById(id);
};

export const createNewResult = async (result) => {
  return await createResult(result);
};

export const updateExistingResult = async (id, result) => {
  await updateResult(id, result);
};

export const deleteExistingResult = async (id) => {
  await deleteResult(id);
};

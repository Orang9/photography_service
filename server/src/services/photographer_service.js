import {
  findAllPhotographer,
  findPhotographerById,
  createPhotographer,
  updatePhotographer,
  deletePhotographer,
} from "../models/mysql/photographer_model.js";

export const getPhotographers = async () => {
  return await findAllPhotographer();
};

export const getPhotographerById = async (id) => {
  return await findPhotographerById(id);
};

export const createNewPhotographer = async (photographer) => {
  return await createPhotographer(photographer);
};

export const updateExistingPhotographer = async (id, photographer) => {
  await updatePhotographer(id, photographer);
};

export const deleteExistingPhotographer = async (id) => {
  await deletePhotographer(id);
};

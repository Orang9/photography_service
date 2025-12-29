import {
  findAllUsers,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../models/mysql/user_model.js";

export const getUsers = async () => {
  return await findAllUsers();
};

export const getUserById = async (id) => {
  return await findUserById(id);
};

export const createNewUser = async (user) => {
  return await createUser(user);
};

export const updateExistingUser = async (id, user) => {
  await updateUser(id, user);
};

export const deleteExistingUser = async (id) => {
  await deleteUser(id);
};

import { findAllUsers } from "../models/mysql/user.model.js";

export const getUsers = async () => {
  return await findAllUsers();
};

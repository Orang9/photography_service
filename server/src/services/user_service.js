import bcrypt from "bcrypt";
import {
  findAllUsers,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} from "../models/mysql/user_model.js";

export const getUsers = async () => {
  return await findAllUsers();
};

export const getUserById = async (id) => {
  return await findUserById(id);
};

export const createNewUser = async (user) => {
  const { email, password } = user;
  // Validate email: must contain @
  const emailRegex = /@/;
  if (!emailRegex.test(email)) {
    throw new Error("Email must contain '@'.");
  }
  // Validate password: min 8 chars, 1 uppercase, 1 lowercase, 1 symbol
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
  if (!passwordRegex.test(password)) {
    throw new Error(
      "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one symbol."
    );
  }
  return await createUser(user);
};

export const updateExistingUser = async (id, user) => {
  const { email, password } = user;
  // Validate email: must contain @
  const emailRegex = /@/;
  if (!emailRegex.test(email)) {
    throw new Error("Email must contain '@'.");
  }
  // Validate password: min 8 chars, 1 uppercase, 1 lowercase, 1 symbol
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
  if (!passwordRegex.test(password)) {
    throw new Error(
      "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one symbol."
    );
  }
  await updateUser(id, user);
};

export const deleteExistingUser = async (id) => {
  await deleteUser(id);
};

export const authenticateUser = async (email, password) => {
  const user = await loginUser(email);
  if (!user) return null;
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return null;
  return user;
};

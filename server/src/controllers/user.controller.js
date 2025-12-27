import { getUsers } from "../services/user.service.js";

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

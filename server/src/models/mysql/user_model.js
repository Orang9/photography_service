import pool from "../../config/mysql.js";

export const findAllUsers = async () => {
  try {
    console.log("Attempting to query users...");
    const [rows] = await pool.query("SELECT * FROM user");
    console.log("Query successful, rows:", rows.length);
    return rows;
  } catch (error) {
    console.error("Database query error:", error.message);
    throw error;
  }
};

export const findUserById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM user WHERE user_id = ?", [id]);
  return rows[0];
};

export const createUser = async (user) => {
  const { username, fullname, email, password, role, phone } = user;
  const [result] = await pool.query("INSERT INTO user (username, fullname, email, password, role, phone) VALUES (?, ?, ?, ?, ?, ?)", [username, fullname, email, password, role, phone]);
  return result.insertId;
};

export const updateUser = async (id, user) => {
  const { username, fullname, email, password, role, phone } = user;
  await pool.query("UPDATE user SET username = ?, fullname = ?, email = ?, password = ?, role = ?, phone = ? WHERE user_id = ?", [username, fullname, email, password, role, phone, id]);
};

export const deleteUser = async (id) => {
  await pool.query("DELETE FROM user WHERE user_id = ?", [id]);
};

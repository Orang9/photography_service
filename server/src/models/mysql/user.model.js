import pool from "../../config/mysql.js";

export const findAllUsers = async () => {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
};

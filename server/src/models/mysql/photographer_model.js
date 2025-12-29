import pool from "../../config/mysql.js";

export const findAllPhotographer = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM photographer");
    console.log("Photographers found:", rows.length);
    return rows;
  } catch (error) {
    console.error("Error fetching photographers:", error);
    throw error;
  }
};

export const findPhotographerById = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM photographer WHERE photographer_id = ?",
    [id]
  );
  return rows[0];
};

export const createPhotographer = async (photographer) => {
  const { name, email, phone, status } = photographer;
  const [result] = await pool.query(
    "INSERT INTO photographer (name, email, phone, status) VALUES (?, ?, ?, ?)",
    [name, email, phone, status]
  );
  return result.insertId;
};

export const updatePhotographer = async (id, photographer) => {
  const { name, email, phone, status } = photographer;
  await pool.query(
    "UPDATE photographer SET name = ?, email = ?, phone = ?, status = ? WHERE photographer_id = ?",
    [name, email, phone, status, id]
  );
};

export const deletePhotographer = async (id) => {
  await pool.query("DELETE FROM photographer WHERE photographer_id = ?", [id]);
};

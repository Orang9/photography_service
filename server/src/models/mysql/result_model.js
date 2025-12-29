import pool from "../../config/mysql.js";

export const findAllResult = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM result");
    console.log("Results found:", rows.length);
    return rows;
  } catch (error) {
    console.error("Error fetching results:", error);
    throw error;
  }
};

export const findResultById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM result WHERE result_id = ?", [
    id,
  ]);
  return rows[0];
};

export const createResult = async (result) => {
  const { job_id } = result;
  const [resultData] = await pool.query(
    "INSERT INTO result (job_id) VALUES (?)",
    [job_id]
  );
  return resultData.insertId;
};

export const updateResult = async (id, result) => {
  const { job_id } = result;
  await pool.query("UPDATE result SET job_id = ? WHERE result_id = ?", [
    job_id,
    id,
  ]);
};

export const deleteResult = async (id) => {
  await pool.query("DELETE FROM result WHERE result_id = ?", [id]);
};

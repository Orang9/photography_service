import pool from "../../config/mysql.js";

export const findAllResultFile = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM resultfile");
    console.log("Result files found:", rows.length);
    return rows;
  } catch (error) {
    console.error("Error fetching result files:", error);
    throw error;
  }
};

export const findResultFileById = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM resultfile WHERE file_id = ?",
    [id]
  );
  return rows[0];
};

export const createResultFile = async (resultFile) => {
  const { result_id, file_url } = resultFile;
  const [result] = await pool.query(
    "INSERT INTO resultfile (result_id, file_url) VALUES (?, ?)",
    [result_id, file_url]
  );
  return result.insertId;
};

export const updateResultFile = async (id, resultFile) => {
  const { result_id, file_url } = resultFile;
  await pool.query(
    "UPDATE resultfile SET result_id = ?, file_url = ? WHERE file_id = ?",
    [result_id, file_url, id]
  );
};

export const deleteResultFile = async (id) => {
  await pool.query("DELETE FROM resultfile WHERE file_id = ?", [id]);
};

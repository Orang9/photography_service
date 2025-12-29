import pool from "../../config/mysql_config.js";

export const findAllJob = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM job");
    console.log("Jobs found:", rows.length);
    return rows;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

export const findJobById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM job WHERE job_id = ?", [id]);
  return rows[0];
};

export const createJob = async (job) => {
  const { transaction_id, photographer_id, status } = job;
  const [result] = await pool.query(
    "INSERT INTO job (transaction_id, photographer_id, status) VALUES (?, ?, ?)",
    [transaction_id, photographer_id, status]
  );
  return result.insertId;
};

export const updateJob = async (id, job) => {
  const { transaction_id, photographer_id, status } = job;
  await pool.query(
    "UPDATE job SET transaction_id = ?, photographer_id = ?, status = ? WHERE job_id = ?",
    [transaction_id, photographer_id, status, id]
  );
};

export const deleteJob = async (id) => {
  await pool.query("DELETE FROM job WHERE job_id = ?", [id]);
};

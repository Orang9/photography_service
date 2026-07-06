import pool from "../../config/mysql.js";

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
  // Dynamic update to handle when only 'status' is provided (since transaction_id/photographer_id would be undefined)
  const fields = [];
  const values = [];
  if (job.transaction_id !== undefined) {
    fields.push("transaction_id = ?");
    values.push(job.transaction_id);
  }
  if (job.photographer_id !== undefined) {
    fields.push("photographer_id = ?");
    values.push(job.photographer_id);
  }
  if (job.status !== undefined) {
    fields.push("status = ?");
    values.push(job.status);
  }
  values.push(id);

  const [result] = await pool.query(
    `UPDATE job SET ${fields.join(", ")} WHERE job_id = ?`,
    values
  );
  return result;
};

export const deleteJob = async (id) => {
  await pool.query("DELETE FROM job WHERE job_id = ?", [id]);
};

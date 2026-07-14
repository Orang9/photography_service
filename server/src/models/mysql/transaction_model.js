import pool from "../../config/mysql.js";

export const findAllTransaction = async () => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        CONCAT('#TRX-', t.transaction_id) as id,
        u.fullname as client_name,
        -- Extract package name from the bracketed string we put in location for now
        SUBSTRING_INDEX(SUBSTRING_INDEX(t.location, '(', -1), ')', 1) as package_name,
        DATE_FORMAT(t.created_at, '%d/%m/%Y') as transaction_date,
        t.decline_reason,
        CASE t.status
          WHEN 'awaiting_schedule_approval' THEN 'Menunggu Persetujuan'
          WHEN 'unpaid' THEN 'Menunggu Pembayaran'
          WHEN 'awaiting_dp_verification' THEN 'Menunggu Verifikasi'
          WHEN 'dp_paid' THEN 'DP Terverifikasi'
          WHEN 'fully_paid' THEN 'Lunas'
          WHEN 'rejected' THEN 'Batal'
          ELSE 'Menunggu Persetujuan'
        END as status
      FROM transaction t
      JOIN user u ON t.user_id = u.user_id
    `);
    console.log("Transactions found:", rows.length);
    return rows;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

export const findTransactionsByUserId = async (userId) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        CONCAT('BK-', YEAR(t.created_at), '-', LPAD(t.transaction_id, 5, '0')) as id,
        u.fullname as client_name,
        SUBSTRING_INDEX(SUBSTRING_INDEX(t.location, '(', -1), ')', 1) as package_name,
        t.location,
        t.amount as total,
        DATE_FORMAT(t.created_at, '%d %b %Y') as date,
        t.decline_reason,
        CASE t.status
          WHEN 'awaiting_schedule_approval' THEN 'Waiting Schedule Approval'
          WHEN 'unpaid' THEN 'Waiting Payment'
          WHEN 'awaiting_dp_verification' THEN 'Waiting Approval'
          WHEN 'dp_paid' THEN 'Process'
          WHEN 'fully_paid' THEN 'Complete'
          WHEN 'rejected' THEN 'Payment Rejected'
          ELSE 'Waiting Schedule Approval'
        END as status
      FROM transaction t
      JOIN user u ON t.user_id = u.user_id
      WHERE t.user_id = ?
    `, [userId]);
    return rows;
  } catch (error) {
    console.error("Error fetching user transactions:", error);
    throw error;
  }
};

export const findTransactionById = async (id) => {
  const [rows] = await pool.query(
    `SELECT 
      t.*,
      u.fullname as client_name,
      SUBSTRING_INDEX(SUBSTRING_INDEX(t.location, '(', -1), ')', 1) as package_name
     FROM transaction t
     JOIN user u ON t.user_id = u.user_id
     WHERE t.transaction_id = ?`,
    [id]
  );
  return rows[0];
};

export const createTransaction = async (transaction) => {
  const { user_id, location, amount, status } = transaction;
  const [result] = await pool.query(
    "INSERT INTO transaction (user_id, location, amount, status) VALUES (?, ?, ?, ?)",
    [user_id, location, amount, status]
  );
  return result.insertId;
};

export const updateTransaction = async (id, transaction) => {
  const fields = [];
  const values = [];

  if (transaction.user_id !== undefined) {
    fields.push("user_id = ?");
    values.push(transaction.user_id);
  }
  if (transaction.location !== undefined) {
    fields.push("location = ?");
    values.push(transaction.location);
  }
  if (transaction.amount !== undefined) {
    fields.push("amount = ?");
    values.push(transaction.amount);
  }
  if (transaction.total_amount !== undefined) {
    fields.push("total_amount = ?");
    values.push(transaction.total_amount);
  }
  if (transaction.status !== undefined) {
    fields.push("status = ?");
    values.push(transaction.status);
  }
  if (transaction.decline_reason !== undefined) {
    fields.push("decline_reason = ?");
    values.push(transaction.decline_reason);
  }

  if (fields.length === 0) return;

  values.push(id);
  const query = `UPDATE transaction SET ${fields.join(", ")} WHERE transaction_id = ?`;
  await pool.query(query, values);
};

export const deleteTransaction = async (id) => {
  await pool.query("DELETE FROM transaction WHERE transaction_id = ?", [id]);
};

import pool from "../../config/mysql.js";

export const findAllTransaction = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM transaction");
    console.log("Transactions found:", rows.length);
    return rows;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

export const findTransactionById = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM transaction WHERE transaction_id = ?",
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
  const { user_id, location, total_amount, status } = transaction;
  await pool.query(
    "UPDATE transaction SET user_id = ?, location = ?, total_amount = ?, status = ? WHERE transaction_id = ?",
    [user_id, location, total_amount, status, id]
  );
};

export const deleteTransaction = async (id) => {
  await pool.query("DELETE FROM transaction WHERE transaction_id = ?", [id]);
};

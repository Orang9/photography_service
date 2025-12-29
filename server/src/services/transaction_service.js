import {
  findAllTransaction,
  findTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../models/mysql/transaction_model.js";

export const getTransactions = async () => {
  return await findAllTransaction();
};

export const getTransactionById = async (id) => {
  return await findTransactionById(id);
};

export const createNewTransaction = async (transaction) => {
  return await createTransaction(transaction);
};

export const updateExistingTransaction = async (id, transaction) => {
  await updateTransaction(id, transaction);
};

export const deleteExistingTransaction = async (id) => {
  await deleteTransaction(id);
};

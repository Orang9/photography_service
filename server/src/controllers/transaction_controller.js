import {
  getTransactions,
  getTransactionById,
  createNewTransaction,
  updateExistingTransaction,
  deleteExistingTransaction,
} from "../services/transaction_service.js";

export const getAllTransactions = async (_, res) => {
  try {
    const transactions = await getTransactions();
    res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTransactionId = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await getTransactionById(id);
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }
    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const transaction = req.body;
    const id = await createNewTransaction(transaction);
    res.status(201).json({
      success: true,
      data: { transaction_id: id, ...transaction },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = req.body;
    await updateExistingTransaction(id, transaction);
    res.status(200).json({
      success: true,
      message: "Transaction updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteExistingTransaction(id);
    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

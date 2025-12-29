import express from "express";
import {
  getAllTransactions,
  getTransactionId,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transaction_controller.js";

const router = express.Router();

router.get("/", getAllTransactions);
router.get("/:id", getTransactionId);
router.post("/", createTransaction);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

export default router;

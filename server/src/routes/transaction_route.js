import express from "express";
import {
  getAllTransactions,
  getUserTransactions,
  getTransactionId,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transaction_controller.js";
import { validateRequest, transactionUpdateSchema } from "../middlewares/validate.js";

const router = express.Router();

router.get("/", getAllTransactions);
router.get("/user/:userId", getUserTransactions);
router.get("/:id", getTransactionId);
router.post("/", validateRequest(transactionUpdateSchema), createTransaction);
router.put("/:id", validateRequest(transactionUpdateSchema), updateTransaction);
router.delete("/:id", deleteTransaction);

export default router;

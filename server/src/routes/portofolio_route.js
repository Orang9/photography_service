import express from "express";
import {
  createPortfolio,
  getAllPortfolios,
  getPortfolioById,
} from "../controllers/portofolio_controller.js";

const router = express.Router();

router.post("/", createPortfolio);
router.get("/", getAllPortfolios);
router.get("/:id", getPortfolioById);

export default router;

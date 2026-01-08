import express from "express";
import {
  createReview,
  getReviewsByPortfolio,
} from "../controllers/review_controller.js";

const router = express.Router();

router.post("/", createReview);
router.get("/portfolio/:portfolioId", getReviewsByPortfolio);

export default router;

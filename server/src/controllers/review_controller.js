import {
  createReviewService,
  getReviewsByPortfolioService,
} from "../services/review_service.js";
import mongoose from "mongoose";

export const createReview = async (req, res) => {
  try {
    const { portfolio_id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(portfolio_id)) {
      return res.status(400).json({ message: "ID Portfolio tidak valid" });
    }

    const review = await createReviewService(req.body);
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Gagal membuat review: " + error.message });
  }
};

export const getReviewsByPortfolio = async (req, res) => {
  const { portfolioId } = req.params;
  try {
    const reviews = await getReviewsByPortfolioService(portfolioId);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

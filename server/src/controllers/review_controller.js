import Review from "../models/mongo/review.js";
import Portfolio from "../models/mongo/portofolio.js";

export const createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);

    await Portfolio.findByIdAndUpdate(review.portfolio_id, {
      $push: { reviews: review._id },
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReviewsByPortfolio = async (req, res) => {
  try {
    const reviews = await Review.find({
      portfolio_id: req.params.portfolioId,
    });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

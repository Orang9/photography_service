import Review from "../models/mongo/review.js";
import Portfolio from "../models/mongo/portofolio.js";

export const createReviewService = async (reviewData) => {
  // 1. Buat review baru
  const newReview = await Review.create(reviewData);

  // 2. Hubungkan ID review ke Portfolio terkait (Two-way referencing)
  await Portfolio.findByIdAndUpdate(reviewData.portfolio_id, {
    $push: { reviews: newReview._id },
  });

  return newReview;
};

export const getReviewsByPortfolioService = async (portfolioId) => {
  return await Review.find({ portfolio_id: portfolioId }).sort({
    review_date: -1,
  });
};

export const deleteReviewService = async (reviewId) => {
  const review = await Review.findById(reviewId);
  if (review) {
    // Hapus referensi ID review dari array di Portfolio sebelum menghapus review-nya
    await Portfolio.findByIdAndUpdate(review.portfolio_id, {
      $pull: { reviews: reviewId },
    });
    return await Review.findByIdAndDelete(reviewId);
  }
  return null;
};

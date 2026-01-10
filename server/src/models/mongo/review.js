import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    portfolio_id: {
      type: String,
      ref: "Portfolio",
      required: true,
    },
    customer_name: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    description: { type: String, required: true },
    review_date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "reviews" }
);

export default mongoose.model("Review", reviewSchema);

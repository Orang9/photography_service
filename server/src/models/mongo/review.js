import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    portfolio_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Portfolio",
      required: true,
    },
    customer_name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    description: { type: String, required: true },
    review_date: { type: Date, default: Date.now },
  },
  { collection: "reviews", versionKey: false }
);

export default mongoose.model("Review", reviewSchema);

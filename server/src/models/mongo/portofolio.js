import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    photographer_name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    drive_link: { type: String, required: true },
    description: { type: String, required: true },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "portfolios" }
);

export default mongoose.model("Portfolio", portfolioSchema);

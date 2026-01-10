import Portfolio from "../models/mongo/portofolio.js";

export const createPortfolioService = async (data) => {
  return await Portfolio.create(data);
};

export const getAllPortfoliosService = async () => {
  // Mengambil semua portfolio, urutkan dari yang terbaru,
  // dan ambil data review lengkapnya
  return await Portfolio.find().populate("reviews").sort({ created_at: -1 });
};

export const getPortfolioByIdService = async (id) => {
  return await Portfolio.findById(id).populate("reviews");
};

export const updatePortfolioService = async (id, data) => {
  return await Portfolio.findByIdAndUpdate(id, data, { new: true });
};

export const deletePortfolioService = async (id) => {
  return await Portfolio.findByIdAndDelete(id);
};

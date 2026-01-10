import {
  createPortfolioService,
  getAllPortfoliosService,
  getPortfolioByIdService,
} from "../services/portfolio_service.js";
import mongoose from "mongoose";

export const createPortfolio = async (req, res) => {
  try {
    const portfolio = await createPortfolioService(req.body);
    res.status(201).json(portfolio);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Gagal membuat portfolio: " + error.message });
  }
};

export const getAllPortfolios = async (_, res) => {
  try {
    const portfolios = await getAllPortfoliosService();
    res.status(200).json(portfolios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPortfolioById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Format ID tidak valid" });
  }
  try {
    const portfolio = await getPortfolioByIdService(id);
    if (!portfolio)
      return res.status(404).json({ message: "Portfolio tidak ditemukan" });
    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

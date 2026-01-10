import api from "./api";

export const getPortfolios = async () => {
  const res = await api.get("/portfolios");
  return res.data;
};

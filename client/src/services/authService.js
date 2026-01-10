import api from "./api";

export const loginUser = async (email, password) => {
  const res = await api.post("/users/login", {
    email,
    password,
  });
  return res.data;
};

export const registerUser = async (data) => {
  const res = await api.post("/users", data);
  return res.data;
};

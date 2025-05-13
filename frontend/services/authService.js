import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const login = async (email, password) => {
  const { data } = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
  localStorage.setItem("token", data.token);
  return data;
};

export const register = async (name, email, password) => {
  const { data } = await axios.post(`${API_URL}/auth/register`, {
    name,
    email,
    password,
  });
  localStorage.setItem("token", data.token);
  return data;
};

export const logout = () => {
  localStorage.removeItem("token");
};

import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const addAgent = async (agent) => {
  const token = localStorage.getItem("token");
  await axios.post(`${API_URL}/agents/add`, agent, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

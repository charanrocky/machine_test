import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const uploadTasks = async (file) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(`${API_URL}/tasks/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
export const getTasks = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

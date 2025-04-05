import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1/material",
});


export const createMaterial = async (formData) => {
  try {
    const response = await api.post("/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to create material";
  }
};


export const fetchMaterials = async (classId) => {
  try {
    const response = await api.get(`/${classId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch materials";
  }
};
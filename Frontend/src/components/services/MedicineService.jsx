import axios from "axios";

const API = "http://localhost:5000/api/medicine";

export const medicineList = async () => {
  try {
    const token = localStorage.getItem("token"); // Get token from storage

    const response = await axios.get(`${API}/getallmedicine`, {
      headers: {
        Authorization: `Bearer ${token}`, // Send token in header
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching medicines:", error);
  }
};

export const addMedicine = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(`${API}/addmedicine`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error adding medicine:",
      error.response ? error.response.data : error.message
    );
  }
};

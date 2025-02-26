import axios from "axios";

const API = "http://localhost:5000/api/medicine";

export const medicineList = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API}/getallmedicine`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching medicines:", error);
  }
};

export const addMedicine = async (medicineData) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found. Please log in first.");
      return;
    }

    const response = await axios.post(`${API}/addmedicine`, medicineData, {
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
    throw error;
  }
};

export const deleteMed = async (id) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found. Please log in first.");
      return;
    }

    const response = await axios.delete(`${API}/deleteMedicine/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });


  } catch (error) {
    console.error("Error Deleting Medicine", error.message);
    throw error;
  }
};


export const updateMed = async (id, updatedData) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found. Please log in first.");
      return;
    }

    const response = await axios.patch(`${API}/updateMedicine/${id}`, updatedData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error Updating Medicine:", error.response?.data || error.message);
    throw error;
  }
};

export const getMedicineById = async (id) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found. Please log in first.");
      return;
    }

    const response = await axios.get(`${API}/getallmedicine/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("error", error);
  }
}
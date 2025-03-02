import axios from "axios";

const API = "http://localhost:5000/api/sales";

export const getAllSales = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("No token found. Please log in first.");
            return;
        }
        const response = await axios.get(`${API}/getsales`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Sales Error", error);
    }
};

export const addSales = async (salesData) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found. Please log in first.");
            return;
        }
        const response = await axios.post(`${API}/addsales`, salesData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error in Sales Add", error);
    }
};

export const deleteSalesByID = async (id) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found. Please log in first.");
            return;
        }
        await axios.delete(`${API}/deletesales/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return "Data Deleted";
    } catch (error) {
        console.error("Error in Sales Delete", error);
    }
};

export const updateSales = async (id, salesData) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found. Please log in first.");
            return;
        }
        const response = await axios.patch(`${API}/editsales/${id}`, salesData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error in Sales Editing", error);
    }
};

export const getSalesByID = async (id) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found. Please log in first.");
            return;
        }
        const response = await axios.get(`${API}/getsales/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error in Sales Data Getting", error);
    }
};

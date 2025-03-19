import axios from "axios";

const API = "http://localhost:5000/api/supplier";

const getToken = () => localStorage.getItem("token");

const getAuthHeaders = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};


export const getAllSuppliers = async () => {
    try {
        const response = await axios.get(`${API}/getallsupplier`, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        console.error("Error in fetching suppliers:", error);
        throw error;
    }
};


export const getSupplierByID = async (id) => {
    try {
        const response = await axios.get(`${API}/getallsupplier/${id}`, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        console.error("Error in fetching supplier by ID:", error);
        throw error;
    }
};


export const addSupplier = async (supplierData) => {
    try {
        const response = await axios.post(`${API}/addsupplier`, supplierData, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        console.error("Error in adding supplier:", error);
        throw error;
    }
};

export const updateSupplier = async (id, supplierData) => {
    try {
        const response = await axios.patch(`${API}/editsupplier/${id}`, supplierData, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        console.error("Error in updating supplier:", error);
        throw error;
    }
};
export const deleteSupplier = async (id) => {
    try {
        const response = await axios.delete(`${API}/deletesupplier/${id}`, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        console.error("Error in deleting supplier:", error);
        throw error;
    }
};

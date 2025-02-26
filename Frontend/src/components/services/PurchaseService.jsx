import axios from "axios";

const API = "http://localhost:5000/api/purchase";


export const getallPurchase = async () => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            console.error("No token found. Please log in first.");
            return;
        }
        const response = await axios.get(`${API}/getallpurchase`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.error("Purchase Error", error);

    }


}
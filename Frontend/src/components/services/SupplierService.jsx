import axios from "axios";

const API="http://localhost:5000/api/supplier";
export const getAllSupplier=async () => {
    try {
        const token=localStorage.getItem("token");

    if(!token)
    {
        console.log("Login First");
    }

    const response=await axios.get(`${API}/getallsupplier`,
        {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        },
    )
    return response.data;
    } catch (error) {
        console.error("Error in Fetching Supplier",error);
    }
}
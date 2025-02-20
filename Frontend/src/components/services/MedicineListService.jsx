import axios from "axios";

const API = "http://localhost:5000/api/auth";

const medicineList = async () => {
    try {
        const response = await axios.get(`${API}/getallmedicine`)
        return response.data;
    } catch (error) {
        console.error("error", error);
    }
}
export default medicineList;
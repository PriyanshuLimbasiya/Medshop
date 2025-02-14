import axios from "axios";

const API = "http://localhost:5000/api/auth/login";

const LoginService = async (email, password) => {
    try {
        const response = await axios.post(
            API,
            { email, password }, // Correct request body
            {
                headers: {
                    "Content-Type": "application/json", // Correct header format
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error In User Login:", error.response?.data || error.message);
        throw error;
    }
};

export default LoginService;

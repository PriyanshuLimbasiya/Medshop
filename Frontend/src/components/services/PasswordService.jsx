import axios from "axios";

const API = "http://localhost:5000/api/auth";

const ForgotPasswordService = async (email) => {
    try {
        const response = await axios.post(
            `${API}/forgotpassword`,
            { email }, // Properly format the email as an object
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        throw {
            message: error.response?.data?.message || "Failed to send password reset link",
            status: error.response?.status
        };
    }
};

export default ForgotPasswordService;
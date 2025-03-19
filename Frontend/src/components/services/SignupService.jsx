import axios from 'axios';

const API = "http://localhost:5000/api/auth/signup";

export const SignupService = async (email, name, password) => {
   try {
      const response = await axios.post(
         API,
         { email, name, password },
         {
            headers: {
               'Content-Type': 'application/json' 
            }
         }
      );
      return response.data;
   } catch (error) {
      console.error("Error In User SignUp:", error.response?.data || error.message);
      throw error;
   }
};



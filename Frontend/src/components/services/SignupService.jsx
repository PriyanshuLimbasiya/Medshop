import React from 'react';

const API="http://localhost:5000/api/auth"
export const SignupService=async(email,password)=>{
   try {
    const response=await axios.post(API);
    return response.data;
    }
    catch (error) {
        console.error("Error In User SignUp");
        throw error;
   }

}

import React from 'react';

const API="http://localhost:5000/api/auth"
export const SignupService=((email,password)=>{
    return axios.post(`${API}/signup`,{email,password})
    .then(res=>res.data)
    .error(err=>console.log(err))
})



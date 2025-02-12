import React, { useState } from 'react';
import { SignupService } from './services/SignupService';

const Signup = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response=await SignupService(formData.email, formData.password);
            console.log(response);
            
            if(response.status===200){
                localStorage.setItem('token', response.data.token);
                navigate('/');
            }
            else{
                setFormData({...formData, password: ''});
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.message || "Email and Password are incorrect",
                });
            }
        } catch (error) {
            console.error("Error in Signup",error);
            throw error;
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="card shadow-lg border-0">
                            <div className="card-body p-5">
                                {/* Header */}
                                <div className="text-center mb-4">
                                    <i className="fas fa-heartbeat fa-3x text-primary mb-3"></i>
                                    <h2 className="text-primary fw-bold">MediCare Connect</h2>
                                    <p className="text-muted">Create your medical account</p>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="form-label">
                                            <i className="fas fa-envelope me-2 text-primary"></i>
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control form-control-lg"
                                            placeholder="doctor@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label">
                                            <i className="fas fa-lock me-2 text-primary"></i>
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control form-control-lg"
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                                        />
                                    </div>

                                    <button 
                                        type="submit" 
                                        className="btn btn-primary w-100 btn-lg mb-4"
                                    >
                                        <i className="fas fa-user-plus me-2"></i>
                                        Create Account
                                    </button>

                                    <div className="text-center">
                                        <p className="text-muted">
                                            Already have an account?{' '}
                                            <a href="/login" className="text-primary text-decoration-none">
                                                Sign in
                                            </a>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
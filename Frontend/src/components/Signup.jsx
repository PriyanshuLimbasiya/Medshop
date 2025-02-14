import React, { useState } from 'react';
import { SignupService } from './services/SignupService';
import Swal from 'sweetalert2';
import LoginService from './services/LoginService';

const Signup = ({ isSignUp }) => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: ''
    });
    const [otp, setOtp] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false); // To track if OTP has been sent

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (isSignUp) {
                const response = await SignupService(formData.email, formData.name, formData.password);
                Swal.fire("Signup Successful", "Please check your email for the OTP", "success");
                setIsOtpSent(true); // OTP sent
            } else {
                const response = await LoginService(formData.email, formData.password);
                Swal.fire("Login Successful", "Welcome Back!", "success");
            }
        } catch (error) {
            setError(error.response?.data?.message || (isSignUp ? "Signup failed" : "Login failed"));
        } finally {
            setLoading(false);
        }
    };

    const handleOtpVerification = async () => {
        try {
            // Call your OTP verification service here
            const response = await axios.post('http://localhost:5000/api/auth/verify-otp', { email: formData.email, otp });
            Swal.fire("OTP Verified", "You have successfully verified your OTP", "success");
            // Redirect or take further actions after OTP verification
        } catch (error) {
            setError("OTP verification failed");
            Swal.fire("Error", "Invalid OTP. Please try again.", "error");
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="card shadow-lg border-0 rounded-lg">
                            <div className="card-body p-5">
                                {/* Header */}
                                <div className="text-center mb-4">
                                    <i className="fas fa-heartbeat fa-3x text-primary mb-3"></i>
                                    <h2 className="text-primary fw-bold">{isSignUp ? 'Sign Up' : 'Login'}</h2>
                                    <p className="text-muted">
                                        {isSignUp ? 'Create your medical account' : 'Welcome back!'}
                                    </p>
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
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>

                                    {isSignUp && (
                                        <div className="mb-4">
                                            <label className="form-label">
                                                <i className="fas fa-user me-2 text-primary"></i>
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                placeholder="Dr. John Doe"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                    )}

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
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            required
                                        />
                                    </div>

                                    {isOtpSent && (
                                        <div className="mb-4">
                                            <label className="form-label">
                                                <i className="fas fa-key me-2 text-primary"></i>
                                                Enter OTP
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                placeholder="Enter OTP"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                required
                                            />
                                        </div>
                                    )}

                                    {error && <p className="text-danger">{error}</p>}

                                    <button type="submit" className="btn btn-primary w-100 btn-lg mb-4" disabled={loading}>
                                        <i className={isSignUp ? "fas fa-user-plus me-2" : "fas fa-sign-in-alt me-2"}></i>
                                        {loading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
                                    </button>

                                    {isOtpSent && (
                                        <button
                                            type="button"
                                            className="btn btn-success w-100 btn-lg mb-4"
                                            onClick={handleOtpVerification}
                                        >
                                            Verify OTP
                                        </button>
                                    )}

                                    <div className="text-center">
                                        <p className="text-muted">
                                            {isSignUp ? "Already have an account?" : "Don't have an account?"}{' '}
                                            <a href={isSignUp ? "/login" : "/signup"} className="text-primary text-decoration-none">
                                                {isSignUp ? "Login" : "Sign Up"}
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

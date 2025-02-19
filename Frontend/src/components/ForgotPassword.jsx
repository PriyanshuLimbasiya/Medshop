import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordService from './services/PasswordService';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await ForgotPasswordService(email);
            Swal.fire(
                "Email Sent",
                "Password reset link has been sent to your email.",
                "success"
            );
            navigate("/login");
        } catch (error) {
            setError(error.message);
            Swal.fire("Error", error.message, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="card shadow-lg border-0 rounded-lg">
                            <div className="card-body p-5">
                                <div className="text-center mb-4">
                                    <i className="fas fa-lock fa-3x text-primary mb-3"></i>
                                    <h2 className="text-primary fw-bold">Forgot Password</h2>
                                    <p className="text-muted">
                                        Enter your email to receive a password reset link
                                    </p>
                                </div>
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
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    {error && <p className="text-danger">{error}</p>}
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100 btn-lg mb-4"
                                        disabled={loading}
                                    >
                                        <i className="fas fa-paper-plane me-2"></i>
                                        {loading ? "Sending..." : "Send Reset Link"}
                                    </button>
                                    <div className="text-center">
                                        <p className="text-muted">
                                            Remember your password?{' '}
                                            <a href="/login" className="text-primary text-decoration-none">
                                                Login
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

export default ForgotPassword;
import React, { useState } from 'react';
import axios from 'axios';

const OtpForm = ({ email }) => {
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success' or 'error'

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setStatus(null);

        try {
            const response = await axios.post('http://localhost:5000/api/auth/verification', { email, otp });
            setMessage(response.data.message);
            setStatus('success');
        } catch (error) {
            setMessage(error.response?.data?.message || 'OTP verification failed');
            setStatus('error');
        } finally {
            setLoading(false);
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
                                    <i className="fas fa-shield-alt fa-3x text-primary mb-3"></i>
                                    <h2 className="text-primary fw-bold">Verify Your Account</h2>
                                    <p className="text-muted">
                                        We sent a verification code to<br />
                                        <span className="fw-medium">{email}</span>
                                    </p>
                                </div>

                                <form onSubmit={handleVerifyOtp}>
                                    <div className="mb-4">
                                        <div className="form-floating">
                                            <input
                                                type="text"
                                                className={`form-control form-control-lg text-center ${status ? (status === 'success' ? 'is-valid' : 'is-invalid') : ''}`}
                                                placeholder="Enter OTP"
                                                maxLength="6"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                                                required
                                            />
                                            <label>Enter 6-digit OTP</label>
                                        </div>
                                    </div>

                                    {message && (
                                        <div className={`alert ${status === 'success' ? 'alert-success' : 'alert-danger'} mb-4`} role="alert">
                                            <i className={`fas ${status === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2`}></i>
                                            {message}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100 btn-lg mb-3"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Verifying...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-check-circle me-2"></i>
                                                Verify OTP
                                            </>
                                        )}
                                    </button>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <button type="button" className="btn btn-link text-primary text-decoration-none p-0">
                                            <i className="fas fa-redo me-1"></i>
                                            Resend Code
                                        </button>
                                        <button type="button" className="btn btn-link text-primary text-decoration-none p-0">
                                            Need help?
                                        </button>
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

export default OtpForm;
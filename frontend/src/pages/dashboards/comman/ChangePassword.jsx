import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const navigate = useNavigate();
    
    // 1. Get User Type and IDs from Storage
    const userType = localStorage.getItem('userType'); // 'student', 'employee', 'registrar', etc.
    const admissionNo = localStorage.getItem('admissionNo');
    const eid = localStorage.getItem('eid');
    const userId = localStorage.getItem('userId'); // For Registrar/TPO
    
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [message, setMessage] = useState({ text: '', type: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic Validation
        if (formData.newPassword !== formData.confirmPassword) {
            setMessage({ text: "New passwords do not match!", type: 'error' });
            return;
        }

        try {
            let response;
            const payload = {
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword
            };

            // 2. STRICT CHECKING based on userType
            if (userType === 'student') {
                response = await axios.post(`http://localhost:8080/api/students/change-password/${admissionNo}`, payload);
            } 
            else if (userType === 'employee') {
                // This covers Faculty, HOD, Exam Controller
                response = await axios.post(`http://localhost:8080/api/employees/change-password/${eid}`, payload);
            }
            else if (userType === 'registrar' || userType === 'tpo') {
                 // OPTIONAL: If you want Registrar/TPO to change passwords too, 
                 // you'd need a backend endpoint for them. For now, we can skip or show error.
                 setMessage({ text: "Admin password change not yet implemented.", type: 'error' });
                 return;
            }
            else {
                setMessage({ text: "Unknown user type. Please login again.", type: 'error' });
                return;
            }

            // Success
            setMessage({ text: response.data, type: 'success' });
            setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' }); 

        } catch (error) {
            console.error("Change Password Error", error);
            if (error.response && error.response.status === 400) {
                setMessage({ text: error.response.data, type: 'error' }); // e.g. "Incorrect old password"
            } else {
                setMessage({ text: "Server error. Please try again.", type: 'error' });
            }
        }
    };

    return (
        <div className="min-vh-100 d-flex flex-column bg-light py-5">
    <div className="container flex-grow-1">
        <div className="row justify-content-center">
            <div className="col-12 col-sm-11 col-md-8 col-lg-6 col-xl-5 px-3 px-sm-4">
                {/* Back Button */}
                <button 
                    className="btn btn-outline-secondary mb-3 transition-all" 
                    onClick={() => navigate(-1)}
                    style={{transition: 'all 0.3s ease'}}
                >
                    <i className="bi bi-arrow-left me-2"></i>Back
                </button>

                {/* Change Password Card */}
                <div className="card shadow-lg border-0 rounded-4">
                    <div className="card-body p-4 p-md-5">
                        <div className="text-center mb-4">
                            <div className="mb-3">
                                <i className="bi bi-key fs-1 text-primary"></i>
                            </div>
                            <h2 className="fw-semibold text-primary mb-2">Change Password</h2>
                            <p className="text-muted small mb-0">
                                <i className="bi bi-shield-lock me-1"></i>
                                Keep your account secure
                            </p>
                        </div>

                        {/* Status Message */}
                        {message.text && (
                            <div 
                                className={`alert ${message.type === 'error' ? 'alert-danger' : 'alert-success'} alert-dismissible fade show`} 
                                role="alert"
                            >
                                <i className={`bi ${message.type === 'error' ? 'bi-exclamation-triangle-fill' : 'bi-check-circle-fill'} me-2`}></i>
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            {/* Old Password */}
                            <div className="mb-4">
                                <label htmlFor="oldPassword" className="form-label fw-medium">
                                    <span className="text-danger">*</span> Old Password
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-end-0">
                                        <i className="bi bi-lock"></i>
                                    </span>
                                    <input 
                                        type="password" 
                                        id="oldPassword"
                                        name="oldPassword" 
                                        className="form-control form-control-lg border-start-0 transition-all"
                                        value={formData.oldPassword} 
                                        onChange={handleChange} 
                                        placeholder="Enter current password"
                                        required
                                        style={{transition: 'all 0.3s ease'}}
                                    />
                                </div>
                            </div>

                            {/* New Password */}
                            <div className="mb-4">
                                <label htmlFor="newPassword" className="form-label fw-medium">
                                    <span className="text-danger">*</span> New Password
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-end-0">
                                        <i className="bi bi-lock-fill"></i>
                                    </span>
                                    <input 
                                        type="password" 
                                        id="newPassword"
                                        name="newPassword" 
                                        className="form-control form-control-lg border-start-0 transition-all"
                                        value={formData.newPassword} 
                                        onChange={handleChange} 
                                        placeholder="Enter new password"
                                        required
                                        style={{transition: 'all 0.3s ease'}}
                                    />
                                </div>
                                <div className="form-text">
                                    <i className="bi bi-info-circle me-1"></i>
                                    Use at least 8 characters with a mix of letters and numbers
                                </div>
                            </div>

                            {/* Confirm New Password */}
                            <div className="mb-4">
                                <label htmlFor="confirmPassword" className="form-label fw-medium">
                                    <span className="text-danger">*</span> Confirm New Password
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-end-0">
                                        <i className="bi bi-shield-check"></i>
                                    </span>
                                    <input 
                                        type="password" 
                                        id="confirmPassword"
                                        name="confirmPassword" 
                                        className="form-control form-control-lg border-start-0 transition-all"
                                        value={formData.confirmPassword} 
                                        onChange={handleChange} 
                                        placeholder="Re-enter new password"
                                        required
                                        style={{transition: 'all 0.3s ease'}}
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="row g-3 mt-3 pt-3 border-top">
                                <div className="col-md-6">
                                    <button 
                                        type="button" 
                                        onClick={() => navigate(-1)}
                                        className="btn btn-secondary btn-lg w-100 fw-semibold transition-all"
                                        style={{transition: 'all 0.3s ease'}}
                                    >
                                        <i className="bi bi-x-circle me-2"></i>Cancel
                                    </button>
                                </div>
                                <div className="col-md-6">
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary btn-lg w-100 fw-semibold transition-all"
                                        style={{transition: 'all 0.3s ease'}}
                                    >
                                        <i className="bi bi-check-circle me-2"></i>Update Password
                                    </button>
                                </div>
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

export default ChangePassword;
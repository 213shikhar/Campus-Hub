import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const navigate = useNavigate();
    
    // 1. Identify User Type
    const admissionNo = localStorage.getItem('admissionNo');
    const eid = localStorage.getItem('eid');
    
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

        // 2. Client-Side Validation
        if (formData.newPassword !== formData.confirmPassword) {
            setMessage({ text: "New passwords do not match!", type: 'error' });
            return;
        }
        if (formData.newPassword.length < 4) {
             setMessage({ text: "Password must be at least 4 characters", type: 'error' });
             return;
        }

        try {
            let response;
            const payload = {
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword
            };

            // 3. Dynamic API Call based on User Type
            if (admissionNo) {
                // It's a student
                response = await axios.post(`http://localhost:8080/api/students/change-password/${admissionNo}`, payload);
            } else if (eid) {
                // It's an employee
                response = await axios.post(`http://localhost:8080/api/employees/change-password/${eid}`, payload);
            } else {
                setMessage({ text: "User session not found. Please login again.", type: 'error' });
                return;
            }

            // Success
            setMessage({ text: response.data, type: 'success' });
            setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' }); // Reset form
            
            // Optional: Logout user after password change
            // localStorage.clear();
            // navigate('/');

        } catch (error) {
            console.error("Change Password Error", error);
            if (error.response && error.response.status === 400) {
                setMessage({ text: error.response.data, type: 'error' }); // "Incorrect old password"
            } else {
                setMessage({ text: "Server error. Please try again.", type: 'error' });
            }
        }
    };

    return (
        <div className="form-container" style={{maxWidth: '500px', margin: '50px auto'}}>
            <h2>Change Password</h2>
            
            {message.text && (
                <div className={`message ${message.type}`} style={{
                    padding: '10px', 
                    marginBottom: '10px', 
                    borderRadius: '5px',
                    backgroundColor: message.type === 'error' ? '#f8d7da' : '#d4edda',
                    color: message.type === 'error' ? '#721c24' : '#155724'
                }}>
                    {message.text}
                </div>
            )}

            <form className='register-form' onSubmit={handleSubmit}>
                <label>Old Password:</label>
                <input 
                    type="password" 
                    name="oldPassword" 
                    value={formData.oldPassword} 
                    onChange={handleChange} 
                    required 
                />

                <label>New Password:</label>
                <input 
                    type="password" 
                    name="newPassword" 
                    value={formData.newPassword} 
                    onChange={handleChange} 
                    required 
                />

                <label>Confirm New Password:</label>
                <input 
                    type="password" 
                    name="confirmPassword" 
                    value={formData.confirmPassword} 
                    onChange={handleChange} 
                    required 
                />

                <div className='btn-row'>
                    <button type='button' onClick={() => navigate(-1)} style={{backgroundColor: '#666'}}>Cancel</button>
                    <button type='submit'>Update Password</button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;
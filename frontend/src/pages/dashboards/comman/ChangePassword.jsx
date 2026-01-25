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
        <div className="form-container" style={{maxWidth: '500px', margin: '50px auto'}}>
            <h2>Change Password</h2>
            
            {message.text && (
                <div className={`message ${message.type}`} style={{
                    padding: '10px', marginBottom: '10px', borderRadius: '5px',
                    backgroundColor: message.type === 'error' ? '#f8d7da' : '#d4edda',
                    color: message.type === 'error' ? '#721c24' : '#155724'
                }}>
                    {message.text}
                </div>
            )}

            <form className='register-form' onSubmit={handleSubmit}>
                <label>Old Password:</label>
                <input type="password" name="oldPassword" value={formData.oldPassword} onChange={handleChange} required />

                <label>New Password:</label>
                <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} required />

                <label>Confirm New Password:</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />

                <div className='btn-row'>
                    <button type='button' onClick={() => navigate(-1)} style={{backgroundColor: '#666'}}>Cancel</button>
                    <button type='submit'>Update Password</button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;
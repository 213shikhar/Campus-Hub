import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


const UpdateEmployeeForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const initialData = location.state?.profile || {};

    const [formData, setFormData] = useState({
        // Read Only
        eid: initialData.eid || '',
        employeeName: initialData.employeeName || '',
        department: initialData.department || '',
        email: initialData.email || '',

        // Editable
        dob: initialData.dob || '',
        gender: initialData.gender || '',
        category: initialData.category || '',
        qualification: initialData.qualification || '',
        experience: initialData.experience || '',
        address: initialData.address || '',
        panCardNo: initialData.panCardNo || '',
        adhaarCardNo: initialData.adhaarCardNo || '',
        fatherName: initialData.fatherName || '',
        spouseName: initialData.spouseName || '',
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/employees/profile/${formData.eid}`, formData);
            alert("Profile Updated!");
            navigate(-1);
        } catch (error) {
            console.error(error);
            alert("Update Failed");
        }
    };

    return (
        <div className="form-container">
            <h2>Update Employee Profile</h2>
            <form className='register-form' onSubmit={handleSubmit}>
                
                <h3 className="section-title">Official Info (Read Only)</h3>
                <label>Employee Name:</label>
                <input type="text" value={formData.employeeName} readOnly className="readonly-field" />
                
                <label>Employee ID:</label>
                <input type="text" value={formData.eid} readOnly className="readonly-field" />

                <h3 className="section-title">Personal Info</h3>
                <label>Qualification:</label>
                <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} />

                <label>Experience:</label>
                <input type="text" name="experience" value={formData.experience} onChange={handleChange} />

                <label>Date of Birth:</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} />

                <label>Address:</label>
                <textarea name="address" value={formData.address} onChange={handleChange} />

                <label>PAN Card No:</label>
                <input type="text" name="panCardNo" value={formData.panCardNo} onChange={handleChange} />

                <div className='btn-row'>
                    <button type='button' onClick={() => navigate(-1)}>Cancel</button>
                    <button type='submit'>Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateEmployeeForm;
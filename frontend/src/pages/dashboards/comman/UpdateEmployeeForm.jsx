import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
// ✅ IMPORT VALIDATOR
import { validateEmployeeUpdate } from './employeeUpdateValidator';


const UpdateEmployeeForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const initialData = location.state?.profile || {};
    const [errors, setErrors] = useState({}); // ✅ Error State

    const [formData, setFormData] = useState({
        // Read Only
        eid: initialData.eid || '',
        employeeName: initialData.employeeName || '',
        department: initialData.department || '',
        email: initialData.email || '',
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // ✅ Clear error when user types
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ Run Validation
        const validationErrors = validateEmployeeUpdate(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

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
                
                <h3 className="section-title">Official Info</h3>
                <label>Employee Name:</label>
                <input type="text" value={formData.employeeName} readOnly className="readonly-field" />
                
                <label>Employee ID:</label>
                <input type="text" value={formData.eid} readOnly className="readonly-field" />

                <h3 className="section-title">Personal Info</h3>
                
                {/* Qualification */}
                <label>Qualification:</label>
                <select
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                >
                    <option value="">-- Select Qualification --</option>
                    <option value="Graduation">Graduation</option>
                    <option value="Postgraduation">Postgraduation</option>
                    <option value="Diploma">Diploma</option>
                    <option value="10th">10th</option>
                    <option value="12th">12th</option>
                    <option value="PhD">PhD</option>
                </select>
                <span className='error'>{errors.qualification && <span>{errors.qualification}</span>}</span>

                {/* Experience */}
                <label>Experience:</label>
                <input 
                    type="text" 
                    name="experience" 
                    value={formData.experience} 
                    onChange={handleChange} 
                    placeholder="e.g. 5 Years"
                />
                <span className='error'>{errors.experience && <span>{errors.experience}</span>}</span>

                {/* DOB */}
                <label>Date of Birth:</label>
                <input 
                    type="date" 
                    name="dob" 
                    value={formData.dob} 
                    onChange={handleChange} 
                />
                <span className='error'>{errors.dob && <span>{errors.dob}</span>}</span>

                <label>Address:</label>
                <textarea name="address" value={formData.address} onChange={handleChange} />

                {/* PAN Card */}
                <label>PAN Card No:</label>
                <input 
                    type="text" 
                    name="panCardNo" 
                    value={formData.panCardNo} 
                    onChange={handleChange} 
                    maxLength={10}
                    placeholder="ABCDE1234F"
                    style={{textTransform: 'uppercase'}} // Visual helper
                />
                <span className='error'>{errors.panCardNo && <span>{errors.panCardNo}</span>}</span>

                <div className='btn-row'>
                    <button type='button' onClick={() => navigate(-1)}>Cancel</button>
                    <button type='submit'>Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateEmployeeForm;
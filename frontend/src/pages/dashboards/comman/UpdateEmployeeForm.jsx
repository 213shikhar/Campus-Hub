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
        <div className="min-vh-100 d-flex flex-column bg-light py-5">
    <div className="container flex-grow-1">
        <div className="row justify-content-center">
            <div className="col-12 col-sm-11 col-md-10 col-lg-8 col-xl-7 px-3 px-sm-4">
                {/* Back Button */}
                <button 
                    className="btn btn-outline-secondary mb-3 transition-all" 
                    onClick={() => navigate(-1)}
                    style={{transition: 'all 0.3s ease'}}
                >
                    <i className="bi bi-arrow-left me-2"></i>Back
                </button>

                {/* Update Employee Profile Card */}
                <div className="card shadow-lg border-0 rounded-4">
                    <div className="card-body p-4 p-md-5">
                        <h2 className="text-center mb-4 fw-semibold text-primary">
                            <i className="bi bi-pencil-square me-2"></i>Update Employee Profile
                        </h2>
                        
                        <form onSubmit={handleSubmit}>
                            {/* SECTION 1: OFFICIAL INFO (READ-ONLY) */}
                            <div className="mb-5">
                                <h3 className="h5 fw-semibold text-secondary mb-4 pb-2 border-bottom">
                                    <i className="bi bi-briefcase me-2"></i>Official Info
                                </h3>
                                
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-medium text-muted small">Employee Name</label>
                                        <input 
                                            type="text" 
                                            value={formData.employeeName} 
                                            readOnly 
                                            className="form-control bg-light border-0"
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-medium text-muted small">Employee ID</label>
                                        <input 
                                            type="text" 
                                            value={formData.eid} 
                                            readOnly 
                                            className="form-control bg-light border-0"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* SECTION 2: PERSONAL INFO (EDITABLE) */}
                            <div className="mb-5">
                                <h3 className="h5 fw-semibold text-secondary mb-4 pb-2 border-bottom">
                                    <i className="bi bi-person me-2"></i>Personal Info
                                </h3>
                                
                                <div className="row g-4">
                                    {/* Qualification */}
                                    <div className="col-md-6">
                                        <label htmlFor="qualification" className="form-label fw-medium">Qualification</label>
                                        <select
                                            id="qualification"
                                            name="qualification"
                                            className="form-select form-select-lg transition-all"
                                            value={formData.qualification}
                                            onChange={handleChange}
                                            style={{transition: 'all 0.3s ease'}}
                                        >
                                            <option value="">-- Select Qualification --</option>
                                            <option value="Graduation">Graduation</option>
                                            <option value="Postgraduation">Postgraduation</option>
                                            <option value="Diploma">Diploma</option>
                                            <option value="10th">10th</option>
                                            <option value="12th">12th</option>
                                            <option value="PhD">PhD</option>
                                        </select>
                                        {errors.qualification && <div className="text-danger small mt-1">{errors.qualification}</div>}
                                    </div>

                                    {/* Experience */}
                                    <div className="col-md-6">
                                        <label htmlFor="experience" className="form-label fw-medium">Experience</label>
                                        <input 
                                            type="text" 
                                            id="experience"
                                            name="experience" 
                                            className="form-control form-control-lg transition-all"
                                            value={formData.experience} 
                                            onChange={handleChange} 
                                            placeholder="e.g. 5 Years"
                                            style={{transition: 'all 0.3s ease'}}
                                        />
                                        {errors.experience && <div className="text-danger small mt-1">{errors.experience}</div>}
                                    </div>

                                    {/* Date of Birth */}
                                    <div className="col-md-6">
                                        <label htmlFor="dob" className="form-label fw-medium">Date of Birth</label>
                                        <input 
                                            type="date" 
                                            id="dob"
                                            name="dob" 
                                            className="form-control form-control-lg transition-all"
                                            value={formData.dob} 
                                            onChange={handleChange}
                                            style={{transition: 'all 0.3s ease'}}
                                        />
                                        {errors.dob && <div className="text-danger small mt-1">{errors.dob}</div>}
                                    </div>

                                    {/* PAN Card */}
                                    <div className="col-md-6">
                                        <label htmlFor="panCardNo" className="form-label fw-medium">PAN Card No</label>
                                        <input 
                                            type="text" 
                                            id="panCardNo"
                                            name="panCardNo" 
                                            className="form-control form-control-lg transition-all"
                                            value={formData.panCardNo} 
                                            onChange={handleChange} 
                                            maxLength={10}
                                            placeholder="ABCDE1234F"
                                            style={{textTransform: 'uppercase', transition: 'all 0.3s ease'}}
                                        />
                                        {errors.panCardNo && <div className="text-danger small mt-1">{errors.panCardNo}</div>}
                                    </div>

                                    {/* Address */}
                                    <div className="col-12">
                                        <label htmlFor="address" className="form-label fw-medium">Address</label>
                                        <textarea 
                                            id="address"
                                            name="address" 
                                            className="form-control transition-all"
                                            value={formData.address} 
                                            onChange={handleChange}
                                            rows={4}
                                            placeholder="Enter complete address"
                                            style={{transition: 'all 0.3s ease'}}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* ACTION BUTTONS */}
                            <div className="row g-3 mt-4 pt-3 border-top">
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
                                        <i className="bi bi-check-circle me-2"></i>Save Changes
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

export default UpdateEmployeeForm;
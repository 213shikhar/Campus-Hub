import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
// ✅ IMPORT THE VALIDATOR
import { validateUpdateForm } from './studentUpdateValidator';

const UpdateStudentForm = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // 1. Initialize State
    const initialData = location.state?.profile || {};

    const [formData, setFormData] = useState({
        // Core Fields (Read Only)
        session: initialData.session || '',
        course: initialData.course || '',
        branch: initialData.branch || '',
        admissionNo: initialData.admissionNo || '',
        studentName: initialData.studentName || '',
        mobile: initialData.mobile || '',
        email: initialData.email || '',
        address: initialData.address || '',

        // Extended Fields (Editable)
        dob: initialData.dob || '',
        gender: initialData.gender || '',
        category: initialData.category || '',
        adhaarCardNo: initialData.adhaarCardNo || '',
        
        // Father
        fatherName: initialData.fatherName || '',
        fatherOccupation: initialData.fatherOccupation || '',
        fatherQualification: initialData.fatherQualification || '',
        fatherMobile: initialData.fatherMobile || '',
        fatherEmail: initialData.fatherEmail || '',
        fatherAdhaar: initialData.fatherAdhaar || '',

        // Mother
        motherName: initialData.motherName || '',
        motherMobile: initialData.motherMobile || '',

        // Guardian
        guardianName: initialData.guardianName || '',
        guardianRelation: initialData.guardianRelation || '',
        guardianAddress: initialData.guardianAddress || '',
        guardianMobile: initialData.guardianMobile || '',
    });

    const [errors, setErrors] = useState({}); // ✅ Added Error State
    const [loading, setLoading] = useState(false);

    // 3. Handle Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // ✅ Clear error for this field when user types
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    // 4. Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ USE THE IMPORTED FUNCTION
        const validationErrors = validateUpdateForm(formData);
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return; 
        }

        setLoading(true);
        try {
            await axios.put(`http://localhost:8080/api/students/profile/${formData.admissionNo}`, formData);
            alert("Profile Updated Successfully!");
            navigate(-1); 
        } catch (error) {
            console.error("Update failed", error);
            alert("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-vh-100 d-flex flex-column bg-light py-5">
    <div className="container flex-grow-1">
        <div className="row justify-content-center">
            <div className="col-12 col-sm-11 col-md-10 col-lg-9 col-xl-8 px-3 px-sm-4">
                {/* Back Button */}
                <button 
                    className="btn btn-outline-secondary mb-3 transition-all" 
                    onClick={() => navigate(-1)}
                    style={{transition: 'all 0.3s ease'}}
                >
                    <i className="bi bi-arrow-left me-2"></i>Back
                </button>

                {/* Update Profile Card */}
                <div className="card shadow-lg border-0 rounded-4">
                    <div className="card-body p-4 p-md-5">
                        <h2 className="text-center mb-4 fw-semibold text-primary">
                            <i className="bi bi-pencil-square me-2"></i>Update Profile
                        </h2>
                        
                        <form onSubmit={handleSubmit}>
                            {/* SECTION 1: GENERAL DETAILS (READ-ONLY) */}
                            <div className="mb-5">
                                <h3 className="h5 fw-semibold text-secondary mb-4 pb-2 border-bottom">
                                    <i className="bi bi-info-circle me-2"></i>General Details
                                </h3>
                                
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-medium text-muted small">Session</label>
                                        <input 
                                            type="text" 
                                            value={formData.session} 
                                            readOnly 
                                            className="form-control bg-light border-0"
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-medium text-muted small">Course</label>
                                        <input 
                                            type="text" 
                                            value={formData.course} 
                                            readOnly 
                                            className="form-control bg-light border-0"
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-medium text-muted small">Branch</label>
                                        <input 
                                            type="text" 
                                            value={formData.branch} 
                                            readOnly 
                                            className="form-control bg-light border-0"
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-medium text-muted small">Admission No</label>
                                        <input 
                                            type="text" 
                                            value={formData.admissionNo} 
                                            readOnly 
                                            className="form-control bg-light border-0"
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-medium text-muted small">Student Name</label>
                                        <input 
                                            type="text" 
                                            value={formData.studentName} 
                                            readOnly 
                                            className="form-control bg-light border-0"
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-medium text-muted small">Registered Mobile</label>
                                        <input 
                                            type="text" 
                                            value={formData.mobile} 
                                            readOnly 
                                            className="form-control bg-light border-0"
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label fw-medium text-muted small">Registered Email</label>
                                        <input 
                                            type="text" 
                                            value={formData.email} 
                                            readOnly 
                                            className="form-control bg-light border-0"
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label fw-medium text-muted small">Permanent Address</label>
                                        <textarea 
                                            value={formData.address} 
                                            readOnly 
                                            className="form-control bg-light border-0" 
                                            rows={3}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* SECTION 2: PERSONAL DETAILS (EDITABLE) */}
                            <div className="mb-5">
                                <h3 className="h5 fw-semibold text-secondary mb-4 pb-2 border-bottom">
                                    <i className="bi bi-person me-2"></i>Personal Details
                                </h3>
                                
                                <div className="row g-4">
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

                                    <div className="col-md-6">
                                        <label htmlFor="gender" className="form-label fw-medium">Gender</label>
                                        <select 
                                            id="gender"
                                            name="gender" 
                                            className="form-select form-select-lg transition-all"
                                            value={formData.gender} 
                                            onChange={handleChange}
                                            style={{transition: 'all 0.3s ease'}}
                                        >
                                            <option value="">-- Select --</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        {errors.gender && <div className="text-danger small mt-1">{errors.gender}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="category" className="form-label fw-medium">Category</label>
                                        <select 
                                            id="category"
                                            name="category" 
                                            className="form-select form-select-lg transition-all"
                                            value={formData.category} 
                                            onChange={handleChange}
                                            style={{transition: 'all 0.3s ease'}}
                                        >
                                            <option value="">-- Select --</option>
                                            <option value="General">General</option>
                                            <option value="OBC">OBC</option>
                                            <option value="SC/ST">SC/ST</option>
                                        </select>
                                        {errors.category && <div className="text-danger small mt-1">{errors.category}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="adhaarCardNo" className="form-label fw-medium">Adhaar Card No</label>
                                        <input 
                                            type="text" 
                                            id="adhaarCardNo"
                                            name="adhaarCardNo" 
                                            className="form-control form-control-lg transition-all"
                                            value={formData.adhaarCardNo} 
                                            onChange={handleChange} 
                                            placeholder="XXXX-XXXX-XXXX"
                                            style={{transition: 'all 0.3s ease'}}
                                        />
                                        {errors.adhaarCardNo && <div className="text-danger small mt-1">{errors.adhaarCardNo}</div>}
                                    </div>
                                </div>
                            </div>

                            {/* SECTION 3: PARENT'S DETAILS */}
                            <div className="mb-5">
                                <h3 className="h5 fw-semibold text-secondary mb-4 pb-2 border-bottom">
                                    <i className="bi bi-people me-2"></i>Parent's Details
                                </h3>
                                
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <label htmlFor="fatherName" className="form-label fw-medium">Father's Name</label>
                                        <input 
                                            type="text" 
                                            id="fatherName"
                                            name="fatherName" 
                                            className="form-control form-control-lg transition-all"
                                            value={formData.fatherName} 
                                            onChange={handleChange}
                                            placeholder="Enter father's name"
                                            style={{transition: 'all 0.3s ease'}}
                                        />
                                        {errors.fatherName && <div className="text-danger small mt-1">{errors.fatherName}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="fatherOccupation" className="form-label fw-medium">Father's Occupation</label>
                                        <input 
                                            type="text" 
                                            id="fatherOccupation"
                                            name="fatherOccupation" 
                                            className="form-control form-control-lg transition-all"
                                            value={formData.fatherOccupation} 
                                            onChange={handleChange}
                                            placeholder="Enter occupation"
                                            style={{transition: 'all 0.3s ease'}}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="fatherMobile" className="form-label fw-medium">Father's Mobile</label>
                                        <input 
                                            type="text" 
                                            id="fatherMobile"
                                            name="fatherMobile" 
                                            className="form-control form-control-lg transition-all"
                                            value={formData.fatherMobile} 
                                            onChange={handleChange} 
                                            maxLength={10}
                                            placeholder="10-digit mobile number"
                                            style={{transition: 'all 0.3s ease'}}
                                        />
                                        {errors.fatherMobile && <div className="text-danger small mt-1">{errors.fatherMobile}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="motherName" className="form-label fw-medium">Mother's Name</label>
                                        <input 
                                            type="text" 
                                            id="motherName"
                                            name="motherName" 
                                            className="form-control form-control-lg transition-all"
                                            value={formData.motherName} 
                                            onChange={handleChange}
                                            placeholder="Enter mother's name"
                                            style={{transition: 'all 0.3s ease'}}
                                        />
                                        {errors.motherName && <div className="text-danger small mt-1">{errors.motherName}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="motherMobile" className="form-label fw-medium">Mother's Mobile</label>
                                        <input 
                                            type="text" 
                                            id="motherMobile"
                                            name="motherMobile" 
                                            className="form-control form-control-lg transition-all"
                                            value={formData.motherMobile} 
                                            onChange={handleChange} 
                                            maxLength={10}
                                            placeholder="10-digit mobile number"
                                            style={{transition: 'all 0.3s ease'}}
                                        />
                                        {errors.motherMobile && <div className="text-danger small mt-1">{errors.motherMobile}</div>}
                                    </div>
                                </div>
                            </div>

                            {/* SECTION 4: GUARDIAN DETAILS */}
                            <div className="mb-5">
                                <h3 className="h5 fw-semibold text-secondary mb-4 pb-2 border-bottom">
                                    <i className="bi bi-shield-check me-2"></i>Guardian Details <span className="text-muted small">(If applicable)</span>
                                </h3>
                                
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <label htmlFor="guardianName" className="form-label fw-medium">Guardian Name</label>
                                        <input 
                                            type="text" 
                                            id="guardianName"
                                            name="guardianName" 
                                            className="form-control form-control-lg transition-all"
                                            value={formData.guardianName} 
                                            onChange={handleChange}
                                            placeholder="Enter guardian's name"
                                            style={{transition: 'all 0.3s ease'}}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="guardianRelation" className="form-label fw-medium">Relation</label>
                                        <input 
                                            type="text" 
                                            id="guardianRelation"
                                            name="guardianRelation" 
                                            className="form-control form-control-lg transition-all"
                                            value={formData.guardianRelation} 
                                            onChange={handleChange}
                                            placeholder="e.g., Uncle, Aunt"
                                            style={{transition: 'all 0.3s ease'}}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="guardianMobile" className="form-label fw-medium">Guardian Mobile</label>
                                        <input 
                                            type="text" 
                                            id="guardianMobile"
                                            name="guardianMobile" 
                                            className="form-control form-control-lg transition-all"
                                            value={formData.guardianMobile} 
                                            onChange={handleChange} 
                                            maxLength={10}
                                            placeholder="10-digit mobile number"
                                            style={{transition: 'all 0.3s ease'}}
                                        />
                                        {errors.guardianMobile && <div className="text-danger small mt-1">{errors.guardianMobile}</div>}
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
                                        disabled={loading}
                                        className="btn btn-primary btn-lg w-100 fw-semibold transition-all"
                                        style={{transition: 'all 0.3s ease'}}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Updating...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-check-circle me-2"></i>Save Changes
                                            </>
                                        )}
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

export default UpdateStudentForm;
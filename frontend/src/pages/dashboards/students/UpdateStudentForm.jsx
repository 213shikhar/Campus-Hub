import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateStudentForm = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // 1. Initialize State
    // We try to load data from the previous page (location.state) if available
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

    const [loading, setLoading] = useState(false);

    // 2. Handle Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 3. Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Adjust the URL to match your Controller
            await axios.put(`http://localhost:8080/api/students/profile/${formData.admissionNo}`, formData);
            alert("Profile Updated Successfully!");
            navigate(-1); // Redirect back to profile view
        } catch (error) {
            console.error("Update failed", error);
            alert("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2>Update Profile</h2>
            <form className='register-form' onSubmit={handleSubmit}>

                {/* --- SECTION 1: IMMUTABLE ACADEMIC DATA --- */}
                <h3 className="section-title">General Details</h3>
                
                <label>Session:</label>
                <input type="text" value={formData.session} readOnly className="readonly-field" />

                <label>Course:</label>
                <input type="text" value={formData.course} readOnly className="readonly-field" />

                <label>Branch:</label>
                <input type="text" value={formData.branch} readOnly className="readonly-field" />

                <label>Admission No:</label>
                <input type="text" value={formData.admissionNo} readOnly className="readonly-field" />

                <label>Student Name:</label>
                <input type="text" value={formData.studentName} readOnly className="readonly-field" />
                
                <label>Registered Mobile:</label>
                <input type="text" value={formData.mobile} readOnly className="readonly-field" />

                <label>Registered Email:</label>
                <input type="text" value={formData.email} readOnly className="readonly-field" />

                <label>Permanent Address:</label>
                <textarea value={formData.address} readOnly className="readonly-field" rows={3} />


                {/* --- SECTION 2: PERSONAL DETAILS --- */}
                <h3 className="section-title">Personal Details</h3>

                <label htmlFor="dob">Date of Birth:</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} />

                <label htmlFor="gender">Gender:</label>
                <select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="">-- Select --</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <label htmlFor="category">Category:</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="">-- Select --</option>
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC/ST">SC/ST</option>
                </select>

                <label htmlFor="adhaarCardNo">Adhaar Card No:</label>
                <input type="text" name="adhaarCardNo" value={formData.adhaarCardNo} onChange={handleChange} placeholder="XXXX-XXXX-XXXX" />


                {/* --- SECTION 3: PARENTS & GUARDIAN --- */}
                <h3 className="section-title">Parent's Details</h3>

                <label htmlFor="fatherName">Father's Name:</label>
                <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} />

                <label htmlFor="fatherOccupation">Father's Occupation:</label>
                <input type="text" name="fatherOccupation" value={formData.fatherOccupation} onChange={handleChange} />

                <label htmlFor="fatherMobile">Father's Mobile:</label>
                <input type="text" name="fatherMobile" value={formData.fatherMobile} onChange={handleChange} />

                <label htmlFor="motherName">Mother's Name:</label>
                <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} />

                <label htmlFor="fatherMobile">Mother's Mobile:</label>
                <input type="text" name="motherMobile" value={formData.motherMobile} onChange={handleChange} />

                <h3 className="section-title">Guardian Details (If applicable)</h3>
                
                <label htmlFor="guardianName">Guardian Name:</label>
                <input type="text" name="guardianName" value={formData.guardianName} onChange={handleChange} />

                <label htmlFor="guardianRelation">Relation:</label>
                <input type="text" name="guardianRelation" value={formData.guardianRelation} onChange={handleChange} />

                <label htmlFor="guardianMobile">Guardian Mobile:</label>
                <input type="text" name="guardianMobile" value={formData.guardianMobile} onChange={handleChange} />

                
                {/* --- BUTTONS --- */}
                <div className='btn-row'>
                    <button type='button' onClick={() => navigate(-1)} style={{backgroundColor: '#666'}}>Cancel</button>
                    <button type='submit' disabled={loading}>
                        {loading ? 'Updating...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateStudentForm;
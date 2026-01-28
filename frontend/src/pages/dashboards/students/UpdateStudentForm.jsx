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
        <div className="form-container">
            <h2>Update Profile</h2>
            <form className='register-form' onSubmit={handleSubmit}>

                <h3 className="section-title">General Details (Read Only)</h3>
                
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
                <span className='error'>{errors.dob && <span>{errors.dob}</span>}</span>

                <label htmlFor="gender">Gender:</label>
                <select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="">-- Select --</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <span className='error'>{errors.gender && <span>{errors.gender}</span>}</span>

                <label htmlFor="category">Category:</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="">-- Select --</option>
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC/ST">SC/ST</option>
                </select>
                <span className='error'>{errors.category && <span>{errors.category}</span>}</span>

                <label htmlFor="adhaarCardNo">Adhaar Card No:</label>
                <input type="text" name="adhaarCardNo" value={formData.adhaarCardNo} onChange={handleChange} placeholder="XXXX-XXXX-XXXX" />
                <span className='error'>{errors.adhaarCardNo && <span>{errors.adhaarCardNo}</span>}</span>


                {/* --- SECTION 3: PARENTS & GUARDIAN --- */}
                <h3 className="section-title">Parent's Details</h3>

                <label htmlFor="fatherName">Father's Name:</label>
                <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} />
                <span className='error'>{errors.fatherName && <span>{errors.fatherName}</span>}</span>

                <label htmlFor="fatherOccupation">Father's Occupation:</label>
                <input type="text" name="fatherOccupation" value={formData.fatherOccupation} onChange={handleChange} />

                <label htmlFor="fatherMobile">Father's Mobile:</label>
                <input type="text" name="fatherMobile" value={formData.fatherMobile} onChange={handleChange} maxLength={10} />
                <span className='error'>{errors.fatherMobile && <span>{errors.fatherMobile}</span>}</span>

                <label htmlFor="motherName">Mother's Name:</label>
                <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} />
                <span className='error'>{errors.motherName && <span>{errors.motherName}</span>}</span>

                <label htmlFor="motherMobile">Mother's Mobile:</label>
                <input type="text" name="motherMobile" value={formData.motherMobile} onChange={handleChange} maxLength={10} />
                <span className='error'>{errors.motherMobile && <span>{errors.motherMobile}</span>}</span>


                {/* --- GUARDIAN --- */}
                <h3 className="section-title">Guardian Details (If applicable)</h3>
                
                <label htmlFor="guardianName">Guardian Name:</label>
                <input type="text" name="guardianName" value={formData.guardianName} onChange={handleChange} />

                <label htmlFor="guardianRelation">Relation:</label>
                <input type="text" name="guardianRelation" value={formData.guardianRelation} onChange={handleChange} />

                <label htmlFor="guardianMobile">Guardian Mobile:</label>
                <input type="text" name="guardianMobile" value={formData.guardianMobile} onChange={handleChange} maxLength={10} />
                <span className='error'>{errors.guardianMobile && <span>{errors.guardianMobile}</span>}</span>

                
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
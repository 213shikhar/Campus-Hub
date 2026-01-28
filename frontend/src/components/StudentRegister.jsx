import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { validateRegistrationForm } from '../pages/studentFormValidator'; 

const StudentRegister = () => {
    const navigate = useNavigate();

    // 1. Unified State (Added 'section')
    const [formData, setFormData] = useState({
        session: "",
        course: "",
        branch: "",
        semester: "",
        section: "", // ✅ NEW FIELD
        admissionNo: "",
        studentname: "",
        mobile: "",
        email: "",
        address: "",
        password: "",
        confirmPassword: "", 
    });

    const [errors, setErrors] = useState({});

    // Dynamic Dropdowns State
    const [availableCourses, setAvailableCourses] = useState([]);
    const [availableBranches, setAvailableBranches] = useState([]);

    // Fetch Data from Registrar API on Page Load
    useEffect(() => {
        // Fetch Courses
        axios.get('http://localhost:8080/api/registrar/courses')
            .then(res => setAvailableCourses(res.data))
            .catch(err => console.error("Error loading courses", err));

        // Fetch Branches (Departments)
        axios.get('http://localhost:8080/api/registrar/departments')
            .then(res => setAvailableBranches(res.data))
            .catch(err => console.error("Error loading branches", err));
    }, []);

    // Handle Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear error for this field
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    // Handle Submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // A. Run Validations
        const validationErrors = validateRegistrationForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return; 
        }

        // B. Prepare JSON payload (Include 'section')
        const dataToSend = {
            session: formData.session,
            course: formData.course,
            branch: formData.branch,
            semester: parseInt(formData.semester), // ✅ Send as Integer
            section: formData.section, // ✅ SEND SECTION
            admissionNo: formData.admissionNo,
            studentname: formData.studentname,
            mobile: formData.mobile,
            email: formData.email,
            address: formData.address,
            password: formData.password
        };

        try {
            const response = await axios.post("http://localhost:8080/api/students/register", dataToSend, {
                headers: { "Content-Type": "application/json" }
            });

            console.log("Backend Response:", response.data);

            if (response.data && response.status === 200) {
                alert("Student Registered Successfully!");
                navigate('/student-dashboard', { state: { student: response.data } });
            }

        } catch (error) {
            console.error("Error:", error);
            
            if (error.response) {
                // Case 1: The backend sent a JSON Object (The [object Object] case)
                if (typeof error.response.data === 'object') {
                    // Extract the specific message from the object
                    // Spring Boot usually sends errors in 'message' or 'error' fields
                    const errorMsg = error.response.data.message || error.response.data.error || JSON.stringify(error.response.data);
                    alert("Registration Failed: " + errorMsg);
                } 
                // Case 2: The backend sent a plain String
                else {
                    alert(error.response.data); 
                }
            } else {
                // Case 3: Server is down or network error
                alert("Registration Failed! Please check your server connection.");
            }
        }
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Center for Development of Advanced Computing, Noida</h1>
            <br /><hr />
            <div className='main-container'>
                <h2 style={{ textAlign: 'center' }}>Student Registration</h2><br />
                <div className='form-container'>
                    <form className='register-form' onSubmit={handleSubmit}>

                        <label htmlFor="session"><span className='asterik'>*</span>Session: </label>
                        <select name="session" id="session" value={formData.session} onChange={handleChange} >
                            <option value="">-- select session --</option>
                            <option value="2025-2029">2025-2029</option>
                            <option value="2029-2033">2029-2033</option>
                            <option value="2033-2037">2033-2037</option>
                        </select>
                        <span className='error'>{errors.session && <span>{errors.session}</span>}</span>

                        {/* Dynamic Course Dropdown */}
                        <label htmlFor="course"><span className='asterik'>*</span>Course: </label>
                        <select name="course" id="course" value={formData.course} onChange={handleChange} required>
                            <option value="">-- select course --</option>
                            {availableCourses.map(c => (
                                <option key={c.id} value={c.courseName}>
                                    {c.courseName.toUpperCase()}
                                </option>
                            ))}
                        </select>
                        <span className='error'>{errors.course && <span>{errors.course}</span>}</span>

                        {/* Dynamic Branch Dropdown */}
                        <label htmlFor="branch"><span className='asterik'>*</span>Branch: </label>
                        <select name="branch" id="branch" value={formData.branch} onChange={handleChange} required>
                            <option value="">-- select branch --</option>
                            {availableBranches.map(b => (
                                <option key={b.id} value={b.deptName}>
                                    {b.deptName.toUpperCase()} ({b.deptCode})
                                </option>
                            ))}
                        </select>
                        <span className='error'>{errors.branch && <span>{errors.branch}</span>}</span>

                        {/* ✅ NEW SEMESTER DROPDOWN */}
                        <label htmlFor="semester"><span className='asterik'>*</span>Semester: </label>
                        <select name="semester" id="semester" value={formData.semester} onChange={handleChange} required>
                            <option value="">-- select semester --</option>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                                <option key={sem} value={sem}>{sem}</option>
                            ))}
                        </select>
                        <span className='error'>{errors.semester && <span>{errors.semester}</span>}</span>

                        {/* ✅ NEW SECTION DROPDOWN */}
                        <label htmlFor="section"><span className='asterik'>*</span>Section: </label>
                        <select name="section" id="section" value={formData.section} onChange={handleChange} required>
                            <option value="">-- select section --</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </select>
                        
                        <label htmlFor="admissionNo"><span className='asterik'>*</span>Admission No: </label>
                        <input type="text" name="admissionNo" id="admissionNo" value={formData.admissionNo} onChange={handleChange} />
                        <span className='error'>{errors.admissionNo && <span>{errors.admissionNo}</span>}</span>

                        <label htmlFor="studentname"><span className='asterik'>*</span>Student Name: </label>
                        <input type="text" name="studentname" id="studentname" value={formData.studentname} onChange={handleChange} />
                        <span className='error'>{errors.studentname && <span>{errors.studentname}</span>}</span>

                        <label htmlFor="mobile"><span className='asterik'>*</span>Mobile No: </label>
                        <input type="text" name="mobile" id="mobile" value={formData.mobile} onChange={handleChange} />
                        <span className='error'>{errors.mobile && <span>{errors.mobile}</span>}</span>

                        <label htmlFor="email"><span className='asterik'>*</span>Email: </label>
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} />
                        <span className='error'>{errors.email && <span>{errors.email}</span>}</span>

                        <label htmlFor="address"><span className='asterik'>*</span>Address: </label>
                        <textarea name="address" id="address" rows={5} cols={30} value={formData.address} onChange={handleChange} />

                        <label htmlFor="password"><span className='asterik'>*</span>Password: </label>
                        <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} />
                        <span className='error'>{errors.password && <span>{errors.password}</span>}</span>

                        <label htmlFor="confirmPassword"><span className='asterik'>*</span>Confirm Password: </label>
                        <input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                        <span className='error'>{errors.confirmPassword && <span>{errors.confirmPassword}</span>}</span>

                        <div className='btn-row'>
                            <button type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
                <br /><p>Already a User? <Link style={{ textDecoration: 'none' }} to="/">Login Here</Link>!</p>
            </div>
            <hr />
            <br /> <p style={{ textAlign: 'center', fontSize: 'small' }}>&copy; CampusHub 2026</p>
        </div>
    );
}

export default StudentRegister; 
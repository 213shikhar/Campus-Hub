import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { validateRegistrationForm } from '../pages/studentFormValidator'; 

const StudentRegister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        session: "",
        course: "",
        branch: "",
        semester: "",
        section: "",
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

        // Fetch Branches
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

        const validationErrors = validateRegistrationForm(formData);
        // if errors present, stop form submission
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            // Exits the function early, stopping the form submission process
            return; 
        }

        // preparing json
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
                // FIX: Save to Local Storage immediately!
        // This ensures the Profile page can find the user.
        localStorage.setItem("admissionNo", formData.admissionNo);
        localStorage.setItem("userType", "student"); 
        
        // (Optional) If you use userId elsewhere
        localStorage.setItem("userId", formData.admissionNo);
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
        <div className="min-vh-100 d-flex flex-column bg-light">
    {/* Header Section */}
    <div className="bg-primary text-white py-4">
        <div className="container">
            <h1 className="h3 text-center mb-0 fw-bold">Center for Development of Advanced Computing, Noida</h1>
        </div>
    </div>

    {/* Main Content */}
    <div className="container my-5 flex-grow-1">
        <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-9">
                <div className="card shadow-lg border-0 rounded-4">
                    <div className="card-body p-4 p-md-5">
                        <h2 className="text-center mb-4 fw-semibold text-primary">Student Registration</h2>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="row g-4">
                                {/* Session */}
                                <div className="col-md-6">
                                    <label htmlFor="session" className="form-label fw-medium">
                                        <span className="text-danger">*</span> Session
                                    </label>
                                    <select 
                                        name="session" 
                                        id="session" 
                                        className="form-select form-select-lg transition-all" 
                                        value={formData.session} 
                                        onChange={handleChange}
                                        required
                                        style={{transition: 'all 0.3s ease'}}
                                    >
                                        <option value="">-- select session --</option>
                                        <option value="2025-2029">2025-2029</option>
                                        <option value="2029-2033">2029-2033</option>
                                        <option value="2033-2037">2033-2037</option>
                                    </select>
                                    {errors.session && <div className="text-danger small mt-1">{errors.session}</div>}
                                </div>

                                {/* Course */}
                                <div className="col-md-6">
                                    <label htmlFor="course" className="form-label fw-medium">
                                        <span className="text-danger">*</span> Course
                                    </label>
                                    <select 
                                        name="course" 
                                        id="course" 
                                        className="form-select form-select-lg transition-all" 
                                        value={formData.course} 
                                        onChange={handleChange} 
                                        required
                                        style={{transition: 'all 0.3s ease'}}
                                    >
                                        <option value="">-- select course --</option>
                                        {availableCourses.map(c => (
                                            <option key={c.id} value={c.courseName}>
                                                {c.courseName.toUpperCase()}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.course && <div className="text-danger small mt-1">{errors.course}</div>}
                                </div>

                                {/* Branch */}
                                <div className="col-md-6">
                                    <label htmlFor="branch" className="form-label fw-medium">
                                        <span className="text-danger">*</span> Branch
                                    </label>
                                    <select 
                                        name="branch" 
                                        id="branch" 
                                        className="form-select form-select-lg transition-all" 
                                        value={formData.branch} 
                                        onChange={handleChange} 
                                        required
                                        style={{transition: 'all 0.3s ease'}}
                                    >
                                        <option value="">-- select branch --</option>
                                        {availableBranches.map(b => (
                                            <option key={b.id} value={b.deptName}>
                                                {b.deptName.toUpperCase()} ({b.deptCode})
                                            </option>
                                        ))}
                                    </select>
                                    {errors.branch && <div className="text-danger small mt-1">{errors.branch}</div>}
                                </div>

                                {/* Semester */}
                                <div className="col-md-3">
                                    <label htmlFor="semester" className="form-label fw-medium">
                                        <span className="text-danger">*</span> Semester
                                    </label>
                                    <select 
                                        name="semester" 
                                        id="semester" 
                                        className="form-select form-select-lg transition-all" 
                                        value={formData.semester} 
                                        onChange={handleChange} 
                                        required
                                        style={{transition: 'all 0.3s ease'}}
                                    >
                                        <option value="">-- select --</option>
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                                            <option key={sem} value={sem}>{sem}</option>
                                        ))}
                                    </select>
                                    {errors.semester && <div className="text-danger small mt-1">{errors.semester}</div>}
                                </div>

                                {/* Section */}
                                <div className="col-md-3">
                                    <label htmlFor="section" className="form-label fw-medium">
                                        <span className="text-danger">*</span> Section
                                    </label>
                                    <select 
                                        name="section" 
                                        id="section" 
                                        className="form-select form-select-lg transition-all" 
                                        value={formData.section} 
                                        onChange={handleChange} 
                                        required
                                        style={{transition: 'all 0.3s ease'}}
                                    >
                                        <option value="">-- select --</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                    </select>
                                </div>

                                {/* Admission No */}
                                <div className="col-md-6">
                                    <label htmlFor="admissionNo" className="form-label fw-medium">
                                        <span className="text-danger">*</span> Admission No
                                    </label>
                                    <input 
                                        type="text" 
                                        name="admissionNo" 
                                        id="admissionNo" 
                                        className="form-control form-control-lg transition-all" 
                                        value={formData.admissionNo} 
                                        onChange={handleChange}
                                        placeholder="Enter admission number"
                                        style={{transition: 'all 0.3s ease'}}
                                    />
                                    {errors.admissionNo && <div className="text-danger small mt-1">{errors.admissionNo}</div>}
                                </div>

                                {/* Student Name */}
                                <div className="col-md-6">
                                    <label htmlFor="studentname" className="form-label fw-medium">
                                        <span className="text-danger">*</span> Student Name
                                    </label>
                                    <input 
                                        type="text" 
                                        name="studentname" 
                                        id="studentname" 
                                        className="form-control form-control-lg transition-all" 
                                        value={formData.studentname} 
                                        onChange={handleChange}
                                        placeholder="Enter full name"
                                        style={{transition: 'all 0.3s ease'}}
                                    />
                                    {errors.studentname && <div className="text-danger small mt-1">{errors.studentname}</div>}
                                </div>

                                {/* Mobile */}
                                <div className="col-md-6">
                                    <label htmlFor="mobile" className="form-label fw-medium">
                                        <span className="text-danger">*</span> Mobile No
                                    </label>
                                    <input 
                                        type="text" 
                                        name="mobile" 
                                        id="mobile" 
                                        className="form-control form-control-lg transition-all" 
                                        value={formData.mobile} 
                                        onChange={handleChange}
                                        placeholder="Enter mobile number"
                                        style={{transition: 'all 0.3s ease'}}
                                    />
                                    {errors.mobile && <div className="text-danger small mt-1">{errors.mobile}</div>}
                                </div>

                                {/* Email */}
                                <div className="col-md-6">
                                    <label htmlFor="email" className="form-label fw-medium">
                                        <span className="text-danger">*</span> Email
                                    </label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        id="email" 
                                        className="form-control form-control-lg transition-all" 
                                        value={formData.email} 
                                        onChange={handleChange}
                                        placeholder="Enter email address"
                                        style={{transition: 'all 0.3s ease'}}
                                    />
                                    {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
                                </div>

                                {/* Address */}
                                <div className="col-12">
                                    <label htmlFor="address" className="form-label fw-medium">
                                        <span className="text-danger">*</span> Address
                                    </label>
                                    <textarea 
                                        name="address" 
                                        id="address" 
                                        rows={4} 
                                        className="form-control transition-all" 
                                        value={formData.address} 
                                        onChange={handleChange}
                                        placeholder="Enter complete address"
                                        style={{transition: 'all 0.3s ease'}}
                                    />
                                </div>

                                {/* Password */}
                                <div className="col-md-6">
                                    <label htmlFor="password" className="form-label fw-medium">
                                        <span className="text-danger">*</span> Password
                                    </label>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        id="password" 
                                        className="form-control form-control-lg transition-all" 
                                        value={formData.password} 
                                        onChange={handleChange}
                                        placeholder="Create a password"
                                        style={{transition: 'all 0.3s ease'}}
                                    />
                                    {errors.password && <div className="text-danger small mt-1">{errors.password}</div>}
                                </div>

                                {/* Confirm Password */}
                                <div className="col-md-6">
                                    <label htmlFor="confirmPassword" className="form-label fw-medium">
                                        <span className="text-danger">*</span> Confirm Password
                                    </label>
                                    <input 
                                        type="password" 
                                        name="confirmPassword" 
                                        id="confirmPassword" 
                                        className="form-control form-control-lg transition-all" 
                                        value={formData.confirmPassword} 
                                        onChange={handleChange}
                                        placeholder="Re-enter password"
                                        style={{transition: 'all 0.3s ease'}}
                                    />
                                    {errors.confirmPassword && <div className="text-danger small mt-1">{errors.confirmPassword}</div>}
                                </div>

                                {/* Submit Button */}
                                <div className="col-12 mt-4">
                                    <div className="d-grid">
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary btn-lg fw-semibold transition-all"
                                            style={{transition: 'all 0.3s ease'}}
                                        >
                                            Submit Registration
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>

                        {/* Login Link */}
                        <div className="text-center mt-4 pt-3 border-top">
                            <p className="mb-0">
                                Already a User? <Link to="/" className="text-decoration-none fw-semibold transition-all" style={{transition: 'all 0.3s ease'}}>Login Here</Link>!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* Footer */}
    <footer className="bg-dark text-white py-3 mt-auto">
        <div className="container">
            <p className="text-center mb-0 small">&copy; CampusHub 2026</p>
        </div>
    </footer>
</div>
    );
}

export default StudentRegister; 
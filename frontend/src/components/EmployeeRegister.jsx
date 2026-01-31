import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { validateRegistrationForm } from '../pages/employeeFormValidator';

const EmployeeRegister = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        type: "",
        course: "", // Only relevant for Faculty/HOD
        department: "",
        eid: "",
        employeeName: "",
        mobile: "",
        email: "",
        address: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});

    // Dynamic Dropdowns
    const [availableCourses, setAvailableCourses] = useState([]);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        // Fetch Courses
        axios.get('http://localhost:8080/api/registrar/courses')
            .then(res => setAvailableCourses(res.data))
            .catch(err => console.error("Error loading courses", err));
        
        // Fetch Departments
        axios.get('http://localhost:8080/api/registrar/departments')
            .then(res => setDepartments(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({ ...formData, [name]: value });

        if(errors[name]){
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
         
        const validationErrors = validateRegistrationForm(formData);
        if (Object.keys(validationErrors).length > 0){
            setErrors(validationErrors);
            return;
        }

        // preparing json
        const dataToSend = {
            type: formData.type,
            course: formData.course,
            department: formData.department,
            eid: formData.eid,
            employeeName: formData.employeeName,
            mobile: formData.mobile,
            email: formData.email,
            address: formData.address,
            password: formData.password,
        };

        try {
            const response = await axios.post("http://localhost:8080/api/employees/register", dataToSend, {
                headers: {"Content-Type":"application/json"}
            });
            
            console.log("Backend Response: ", response.data);

            if (response.data && response.status === 200) {
                alert("Employee Registered Successfully!");

                const employeeData = response.data;
                const employeeType = formData.type; 

                // ✅ FIX: Save IDs to Local Storage immediately
                // This ensures the Profile page works without needing to logout/login
                localStorage.setItem("eid", formData.eid);
                localStorage.setItem("userType", "employee");
                localStorage.setItem("userRole", employeeType); // Important for Dashboard logic

                let targetDashboard = "";

                // 3. Logic: Determine Dashboard based on Type
                switch (employeeType) {
                    case "faculty":
                        targetDashboard = "/faculty-dashboard";
                        break;
                    case "hod":
                        targetDashboard = "/hod-dashboard";
                        break;
                    case "examController":
                        targetDashboard = "/exam-contr-dashboard";
                        break;
                    case "registrar":
                        targetDashboard = "/registrar-dashboard";
                        break;
                    case "tpo":
                        targetDashboard = "/tpo-dashboard";
                        break;
                    default:
                        targetDashboard = "/"; 
                }

                navigate(targetDashboard, { state: { employee: employeeData } });
            }
        }
        catch (error) {
            console.error("Error:", error);
            
            if (error.response && error.response.status === 400) {
                alert(error.response.data); 
            } else if (error.response && error.response.data) {
                alert("Registration Failed: " + (error.response.data.message || "Unknown Error"));
            } else {
                alert("Registration Failed! Please check your server.");
            }
        }
    };

    return(
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
                        <h2 className="text-center mb-4 fw-semibold text-primary">Employee Registration</h2>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="row g-4">
                                {/* Type */}
                                <div className="col-md-6">
                                    <label htmlFor="type" className="form-label fw-medium">
                                        <span className="text-danger">*</span> Type
                                    </label>
                                    <select 
                                        name="type" 
                                        id="type" 
                                        className="form-select form-select-lg transition-all" 
                                        value={formData.type} 
                                        onChange={handleChange}
                                        style={{transition: 'all 0.3s ease'}}
                                    >
                                        <option value="">-- select type --</option>
                                        <option value="faculty">Faculty</option>
                                        <option value="hod">HOD</option>
                                        <option value="examController">Exam Controller</option>
                                    </select>
                                    {errors.type && <div className="text-danger small mt-1">{errors.type}</div>}
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

                                {/* Department */}
                                <div className="col-12">
                                    <label htmlFor="department" className="form-label fw-medium">
                                        <span className="text-danger">*</span> Department
                                    </label>
                                    <select 
                                        name="department" 
                                        id="department" 
                                        className="form-select form-select-lg transition-all" 
                                        value={formData.department} 
                                        onChange={handleChange} 
                                        required
                                        style={{transition: 'all 0.3s ease'}}
                                    >
                                        <option value="">-- Select Department --</option>
                                        {departments.map(dept => (
                                            <option key={dept.id} value={dept.deptName}>
                                                {dept.deptName.toUpperCase()} ({dept.deptCode})
                                            </option>
                                        ))}
                                    </select>
                                    {errors.department && <div className="text-danger small mt-1">{errors.department}</div>}
                                </div>

                                {/* Employee ID */}
                                <div className="col-md-6">
                                    <label htmlFor="eid" className="form-label fw-medium">
                                        <span className="text-danger">*</span> Employee ID
                                    </label>
                                    <input 
                                        type="text" 
                                        name="eid" 
                                        id="eid" 
                                        className="form-control form-control-lg transition-all" 
                                        value={formData.eid} 
                                        onChange={handleChange}
                                        placeholder="Enter employee ID"
                                        style={{transition: 'all 0.3s ease'}}
                                    />
                                    {errors.eid && <div className="text-danger small mt-1">{errors.eid}</div>}
                                </div>

                                {/* Employee Name */}
                                <div className="col-md-6">
                                    <label htmlFor="employeeName" className="form-label fw-medium">
                                        <span className="text-danger">*</span> Employee Name
                                    </label>
                                    <input 
                                        type="text" 
                                        name="employeeName" 
                                        id="employeeName" 
                                        className="form-control form-control-lg transition-all" 
                                        value={formData.employeeName} 
                                        onChange={handleChange}
                                        placeholder="Enter full name"
                                        style={{transition: 'all 0.3s ease'}}
                                    />
                                    {errors.employeeName && <div className="text-danger small mt-1">{errors.employeeName}</div>}
                                </div>

                                {/* Mobile */}
                                <div className="col-md-6">
                                    <label htmlFor="mobile" className="form-label fw-medium">
                                        <span className="text-danger">*</span> Mobile No
                                    </label>
                                    <input 
                                        type="number" 
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
                                    <label htmlFor="address" className="form-label fw-medium">Address</label>
                                    <textarea 
                                        name="address" 
                                        id="address" 
                                        rows={4} 
                                        className="form-control transition-all" 
                                        value={formData.address} 
                                        onChange={handleChange}
                                        placeholder="Enter complete address (optional)"
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
            <p className="text-center mb-0 small">&copy; Shikhar Sharma 2026</p>
        </div>
    </footer>
</div>
    )
}

export default EmployeeRegister;
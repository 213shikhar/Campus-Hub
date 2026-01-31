import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const navigate = useNavigate();

    // State to hold form data
    const [credentials, setCredentials] = useState({
        role: "",
        userid: "", 
        password: ""
    });

    // 2. Handle Input Change -> Its job is to take whatever the user types (or selects) in a form and save it into your credentials state object.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    // 3. Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // clears before new login
        localStorage.clear();
        
        // 1. Basic Validation
        if (!credentials.role || !credentials.userid || !credentials.password) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            // 2. Prepare the Payload
            let category = "employee"; 
            if (credentials.role === "student") category = "student";
            // else if (credentials.role === "parent") category = "parent";

            const loginPayload = {
                role: category,            
                type: credentials.role,    
                userid: credentials.userid,
                password: credentials.password
            };

            // 3. Send Request -> await -> Pauses execution until the backend responds
            const response = await axios.post("http://localhost:8080/api/login", loginPayload); // Response Stores the complete response object from the server (includes headers, status code, data, etc.)
            const userData = response.data; // Extracts just the user data portion from the response (the actual user object returned by the backend, like employee details or student info)

            if (userData) {
                // LOCAL STORAGE
                // 1. Student Login
                if (credentials.role === "student") {
                    localStorage.setItem('admissionNo', userData.admissionNo);
                    localStorage.setItem('userType', 'student');
                }

                // 2. Admin Login
                else if (credentials.role === "registrar") {
                    localStorage.setItem('userId', userData.userId); 
                    localStorage.setItem('userType', credentials.role);
                }

                // 3. Regular Employee Login (Faculty, HOD, etc.)
                else {
                    localStorage.setItem('eid', userData.eid);
                    localStorage.setItem('userType', 'employee');
                }

                // 4. Dynamic Navigation
                switch (credentials.role) {
                    case "student":
                        // passing user data along the way
                        navigate('/student-dashboard', { state: { student: userData } });
                        break;
                    
                    case "faculty":
                        navigate('/faculty-dashboard', { state: { employee: userData } });
                        break;
                    
                    case "hod":
                        navigate('/hod-dashboard', { state: { employee: userData } });
                        break;
                    
                    case "examController":
                        navigate('/exam-contr-dashboard', { state: { employee: userData } });
                        break;
                    
                    case "registrar":
                        navigate('/registrar-dashboard', { state: { admin: userData } });
                        break;

                    default:
                        alert("Dashboard not found for this role.");
                }
            }
        }
        catch (error) {
            console.error("Login Error:", error);
            // unauthorized - 401
            if(error.response && error.response.status === 401) {
                 alert("Invalid Credentials. Please check your ID and Password.");
            } else {
                 alert("Login Failed: Server Error");
            }
        }
    };

    return(
        <div className="min-vh-100 d-flex flex-column">
    {/* Hero Section */}
    <div className="bg-primary text-white py-5">
        <div className="container">
            <h1 className="display-4 fw-bold text-center mb-3">Welcome to CampusHub</h1>
            <h3 className="text-center my-1 fw-bold myh3">Center for Development of Advanced Computing, Noida</h3>
        </div>
    </div>

    {/* Main Content */}
    <div className="container my-5 flex-grow-1">
        <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
                <div className="card shadow-lg border-0 rounded-4">
                    <div className="card-body p-4 p-md-5">
                        <h2 className="card-title text-center mb-4 fw-semibold">Sign In</h2>
                        
                        <form onSubmit={handleSubmit}>
                            {/* Role Selection */}
                            <div className="mb-4">
                                <label htmlFor="role" className="form-label fw-medium"><span className="text-danger">*</span>Role</label>
                                <select 
                                    name="role" 
                                    id="role" 
                                    className="form-select form-select-lg transition-all" 
                                    value={credentials.role} 
                                    onChange={handleChange} 
                                    required
                                    style={{transition: 'all 0.3s ease'}}
                                >
                                    <option value="">-- select role --</option>
                                    <option value="registrar">Registrar</option>
                                    <option value="student">Student</option>
                                    <option value="faculty">Faculty</option>
                                    <option value="hod">HOD</option>
                                    <option value="examController">Exam Controller</option>
                                </select>
                            </div>

                            {/* User ID */}
                            <div className="mb-4">
                                <label htmlFor="userid" className="form-label fw-medium"><span className="text-danger">*</span>User ID</label>
                                <input 
                                    type="text" 
                                    name="userid" 
                                    id="userid" 
                                    className="form-control form-control-lg transition-all" 
                                    value={credentials.userid} 
                                    onChange={handleChange} 
                                    placeholder="Enter your user ID"
                                    required
                                    style={{transition: 'all 0.3s ease'}}
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label fw-medium"><span className="text-danger">*</span>Password</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    className="form-control form-control-lg transition-all" 
                                    value={credentials.password} 
                                    onChange={handleChange} 
                                    placeholder="Enter your password"
                                    required
                                    style={{transition: 'all 0.3s ease'}}
                                />
                            </div>

                            {/* Login Button */}
                            <div className="d-grid mb-4">
                                <button 
                                    type="submit" 
                                    className="btn btn-primary btn-lg fw-semibold transition-all"
                                    style={{transition: 'all 0.3s ease'}}
                                >
                                    Login
                                </button>
                            </div>
                        </form>

                        {/* Registration Links */}
                        <hr className="my-4" />
                        
                        <div className="text-center">
                            <p className="text-muted mb-2 small">New to CampusHub?</p>
                            <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center">
                                <Link 
                                    to="/studentRegister" 
                                    className="btn btn-outline-primary transition-all"
                                    style={{transition: 'all 0.3s ease'}}
                                >
                                    Register as Student
                                </Link>
                                <Link 
                                    to="/employeeRegister" 
                                    className="btn btn-outline-secondary transition-all"
                                    style={{transition: 'all 0.3s ease'}}
                                >
                                    Register as Employee
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* Footer */}
    <footer className="bg-light py-3 mt-auto">
        <div className="container">
            <p className="text-center text-muted mb-0 small">&copy; CampusHub 2026</p>
        </div>
    </footer>
</div>
    )
}

export default Home;
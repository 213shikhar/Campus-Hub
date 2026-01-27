import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const navigate = useNavigate();

    // 1. State to hold form data
    const [credentials, setCredentials] = useState({
        role: "",
        userid: "", 
        password: ""
    });

    // 2. Handle Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    // 3. Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ ADD THIS: Clear old session data before starting a new login
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
            else if (credentials.role === "parent") category = "parent";

            const loginPayload = {
                role: category,            
                type: credentials.role,    
                userid: credentials.userid,
                password: credentials.password
            };

            // 3. Send Request
            const response = await axios.post("http://localhost:8080/api/login", loginPayload);
            const userData = response.data; 

            if (userData) {
                // LOCAL STORAGE
                // 1. Student Login
                if (credentials.role === "student") {
                    localStorage.setItem('admissionNo', userData.admissionNo);
                    localStorage.setItem('userType', 'student');
                }

                // 2. Admin Login (Registrar & TPO)
                else if (credentials.role === "registrar" || credentials.role === "tpo") {
                    // AdminUser entity returns 'userId', not 'eid'
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
                    
                    // ✅ CHANGED: Send as 'admin' to avoid confusion with Employee fields
                    case "registrar":
                        navigate('/registrar-dashboard', { state: { admin: userData } });
                        break;
                                
                    // ✅ CHANGED: Send as 'admin'
                    case "tpo":
                        navigate('/tpo-dashboard', { state: { admin: userData } });
                        break;

                    default:
                        alert("Dashboard not found for this role.");
                }
            }
        }
        catch (error) {
            console.error("Login Error:", error);
            if(error.response && error.response.status === 401) {
                 alert("Invalid Credentials. Please check your ID and Password.");
            } else {
                 alert("Login Failed: Server Error");
            }
        }
    };

    return(
        <div>
            {/* <Header/> */}
            <h1 style={{textAlign:'center'}}>Welcome to CampusHub</h1><br/>
            <hr/>
            <div className='main-container'>
                <h2 style={{textAlign:'center'}}>Center for Development of Advanced Computing, Noida</h2>
                <div className='form-container'>
                    <form className='login-form' onSubmit={handleSubmit}>
                        <label htmlFor="role">Role: </label>
                        <select name="role" id="role" value={credentials.role} onChange={handleChange} required>
                            <option value="">-- select role --</option>
                            <option value="registrar" >Registrar</option>
                            <option value="student" >Student</option>
                            <option value="faculty" >Faculty</option>
                            <option value="hod" >HOD</option>
                            <option value="examController" >Exam Controller</option>
                            {/* <option value="tpo" >Training & Placement (TPO)</option> */}
                        </select>
                    
                        <label htmlFor="userid">User ID: </label>
                        <input type="text" name="userid" id="userid" value={credentials.userid} onChange={handleChange} required/>
                    
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" id="password" value={credentials.password} onChange={handleChange} required/>
                        <br/>
                        <div className='btn-row'>
                            <button type='submit'>Login</button>
                        </div>
                    </form>
                </div>
                <br/><p><Link to="/studentRegister">Register New Student</Link></p><br/>
                <p><Link to="/employeeRegister">Register New Employee</Link></p>
                <br/>
            </div>
            <hr/>
            <br/><p style={{textAlign:'center', fontSize:'small'}}>&copy; Shikhar Sharma 2026</p>
            
        </div>
    )
}

export default Home;
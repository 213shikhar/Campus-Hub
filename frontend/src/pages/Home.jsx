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
            const userData = response.data; // Renamed to userData for clarity

            if (userData) {
                // 4. Dynamic Navigation with CORRECT KEYS
                switch (credentials.role) {
                    case "student":
                        // FIX: Send key 'student'
                        navigate('/student-dashboard', { state: { student: userData } });
                        break;
                    
                    case "faculty":
                        // FIX: Send key 'employee'
                        navigate('/faculty-dashboard', { state: { employee: userData } });
                        break;
                    
                    case "hod":
                        // FIX: Send key 'employee'
                        navigate('/hod-dashboard', { state: { employee: userData } });
                        break;
                    
                    case "registrar":
                        // FIX: Send key 'employee'
                        navigate('/registrar-dashboard', { state: { employee: userData } });
                        break;
                    
                    case "examController":
                        // FIX: Send key 'employee'
                        navigate('/exam-contr-dashboard', { state: { employee: userData } });
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
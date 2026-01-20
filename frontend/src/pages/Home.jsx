import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const navigate = useNavigate();

    // 1. State to hold form data
    const [credentials, setCredentials] = useState({
        role: "",
        userid: "", // This will map to 'admissionNo' for students
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
        
        // Basic validation
        if (!credentials.role || !credentials.userid || !credentials.password) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            // Sending login request to backend
            const response = await axios.post("http://localhost:8080/api/login", credentials);

            // Assuming backend returns the full user object (including name)
            const userData = response.data; 

            if (userData) {
                alert("Login Successful!");

                // Logic to redirect based on Role
                if (credentials.role === "student") {
                    navigate('/student-dashboard', { 
                        state: { studentName: userData.studentname } // key must match backend JSON key
                    });
                } else if (credentials.role === "admin") {
                    // navigate('/admin-dashboard');
                    alert("Admin dashboard not created yet");
                } else {
                    alert("Dashboard for this role is under construction.");
                }
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert("Invalid Credentials! Please check User ID or Password.");
        }
    };
    return(
        <div>
            {/* <Header/> */}
            <h1 style={{textAlign:'center'}}>Welcome to CampusHub</h1><br/>
            <hr/>
            <div className='main-container'>
                <h2 style={{textAlign:'center'}}>Inderprastha Engineering College, Ghaziabad</h2>
                <div className='form-container'>
                    <form className='login-form' onSubmit={handleSubmit}>
                        <label htmlFor="role">Role: </label>
                        <select name="role" id="role" value={credentials.role} onChange={handleChange} required>
                            <option value="">-- select role --</option>
                            <option value="student" >Registrar</option>
                            <option value="student" >Student</option>
                            <option value="employee" >Employee</option>
                            <option value="parent" >Parent</option>
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
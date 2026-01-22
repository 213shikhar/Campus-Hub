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
        
        // 1. Basic Validation
        if (!credentials.role || !credentials.userid || !credentials.password) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            // 2. Prepare the Payload
            // We need to tell the backend TWO things:
            // A. The "Category" (Student vs Employee) -> mapped to 'role'
            // B. The "Specific Type" (Faculty, HOD, etc.) -> mapped to 'type'

            let category = "employee"; // Default category
            if (credentials.role === "student") category = "student";
            else if (credentials.role === "parent") category = "parent";
            const loginPayload = {
                role: category,            // "student", "employee", or "parent"
                type: credentials.role,    // "faculty", "hod", "registrar", etc.
                userid: credentials.userid,
                password: credentials.password
            };

            // 3. Send Request
            const response = await axios.post("http://localhost:8080/api/login", loginPayload);
            const user = response.data;

            if (user) {
                // 4. Dynamic Navigation based on specific selection
                switch (credentials.role) {
                    case "student":
                        navigate('/student-dashboard', { state: { user: user } });
                        break;
                    case "faculty":
                        navigate('/faculty-dashboard', { state: { user: user } });
                        break;
                    case "hod":
                        navigate('/hod-dashboard', { state: { user: user } });
                        break;
                    case "registrar":
                        navigate('/registrar-dashboard', { state: { user: user } });
                        break;
                    case "examController":
                        navigate('/exam-contr-dashboard', { state: { user: user } });
                        break;
                    case "parent":
                        navigate('/parent-dashboard', { state: { user: user } });
                        break;
                    default:
                        alert("Dashboard not found for this role.");
                }
            }
        }
        catch (error) {
            console.error("Login Error:", error);
            alert("Invalid Credentials or Server Error");
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
                            <option value="registrar" >Registrar</option>
                            <option value="student" >Student</option>
                            <option value="faculty" >Faculty</option>
                            <option value="hod" >HOD</option>
                            <option value="examController" >Exam Controller</option>
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
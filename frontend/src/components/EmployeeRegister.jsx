import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { validateRegistrationForm } from '../pages/employeeFormValidator';

const EmployeeRegister = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        type: "",
        course: "",
        department: "",
        eid: "",
        employeeName: "",
        mobile: "",
        email: "",
        address: "",
        password: "",
        confirmPassword: "" // Ensure this exists in state
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({ ...formData, [name]: value });

        if(errors[name]){
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 1. Run validations
        const validationErrors = validateRegistrationForm(formData);
        if (Object.keys(validationErrors).length > 0){
            setErrors(validationErrors);
            return;
        }

        // 2. Prepare JSON data (exclude confirmPassword)
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

        try{
            const response = await axios.post("http://localhost:8080/api/employees/register", dataToSend, {
                headers: {"Content-Type":"application/json"}
            });
            
            console.log("Backend Response: ", response.data);

            if (response.data && response.status === 200) {
                alert("Employee Registered Successfully!");

                const employeeData = response.data;
                const employeeType = formData.type; 
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
                    default:
                        // Fallback if type is unknown
                        targetDashboard = "/"; 
                        alert("Unknown Employee Type. Redirecting to home.");
                }

                // 4. Navigate with state
                navigate(targetDashboard, { state: { employee: employeeData } });
            }
        }
        catch (error) {
            console.error("Error:", error);
            if (error.response && error.response.data) {
                alert("Registration Failed: " + (error.response.data.message || "Unknown Error"));
            } else {
                alert("Registration Failed! Please check your server.");
            }
        }
    };

    return(
        <div>
            <h1 style={{textAlign:'center'}}>Center for Development of Advanced Computing, Noida</h1>
            <br/><hr/>
            <div className='main-container'>
                <h2 style={{textAlign:'center'}}>Employee Registration</h2><br/>
                
                <div className='form-container'>
                    <form className='register-form' onSubmit={handleSubmit}>
                        
                        <label htmlFor="type"><span className='asterik'>*</span>Type: </label>
                        <select name="type" id="type" value={formData.type} onChange={handleChange}>
                            <option value="">-- select type --</option>
                            <option value="faculty" >Faculty</option>
                            <option value="hod" >HOD</option>
                            <option value="examController" >Exam Controller</option>
                        </select>
                        <span className='error'>
                            {errors.type && <span>{errors.type}</span>}
                        </span>

                        <label htmlFor="course"><span className='asterik'>*</span>Course: </label>
                        <select name="course" id="course" value={formData.course} onChange={handleChange}>
                            <option value="">-- select course --</option>
                            <option value="btech" >B.Tech</option>
                            <option value="mtech" >M.Tech</option>
                            <option value="bca" >BCA</option>
                            <option value="mca" >MCA</option>
                        </select>
                        <span className='error'>
                            {errors.course && <span>{errors.course}</span>}
                        </span>
                        
                        <label htmlFor="department"><span className='asterik'>*</span>Department: </label>
                        <select name="department" id="department" value={formData.department} onChange={handleChange}>
                            <option value="">-- select branch --</option>
                            <option value="cse" >Computer Science Engineering</option>
                            <option value="ds" >Data Science</option>
                            <option value="aiml" >AI & ML</option>
                            <option value="it" >Information Technology</option>
                            <option value="ece" >Electronics & Communication Engineering</option>
                            <option value="ee" >Electrical Engineering</option>
                            <option value="me" >Mechanical Engineering</option>
                            <option value="ce" >Civil Engineering</option>
                        </select>
                        <span className='error'>
                            {errors.department && <span>{errors.department}</span>}
                        </span>

                        <label htmlFor="eid"><span className='asterik'>*</span>Employee ID: </label>
                        <input type="text" name="eid" id="eid" value={formData.eid} onChange={handleChange}/>
                        <span className='error'>
                            {errors.eid && <span>{errors.eid}</span>}
                        </span>

                        <label htmlFor="employeeName"><span className='asterik'>*</span>Employee Name: </label>
                        {/* FIXED: Changed from employee.employeeName to formData.employeeName */}
                        <input type="text" name="employeeName" id="employeeName" value={formData.employeeName} onChange={handleChange}/>
                        <span className='error'>
                            {errors.employeeName && <span>{errors.employeeName}</span>}
                        </span>

                        <label htmlFor="mobile"><span className='asterik'>*</span>Mobile No: </label>
                        <input type="number" name="mobile" id="mobile" value={formData.mobile} onChange={handleChange}/>
                        <span className='error'>
                            {errors.mobile && <span>{errors.mobile}</span>}
                        </span>

                        <label htmlFor="email"><span className='asterik'>*</span>Email: </label>
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange}/>
                        <span className='error'>
                            {errors.email && <span>{errors.email}</span>}
                        </span>

                        <label htmlFor="address">Address: </label>
                        <textarea name="address" id="address" rows={5} cols={30} value={formData.address} onChange={handleChange}/>

                        <label htmlFor="password"><span className='asterik'>*</span>Password: </label>
                        <input type="password" name="password" id="password" value={formData.password} onChange={handleChange}/>
                        <span className='error'>
                            {errors.password && <span>{errors.password}</span>}
                        </span>

                        <label htmlFor="confirmPassword"><span className='asterik'>*</span>Confirm Password: </label>
                        {/* FIXED: Added onChange handler */}
                        <input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange}/>
                        <span className='error'>
                            {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
                        </span>

                        <div className='btn-row'>
                            <button type='submit'>Submit</button>
                        </div>
                    
                    </form>
                </div>
                <br/><p>Already a User? <Link style={{textDecoration:'none'}} to="/">Login Here</Link>!</p>
            </div>
            <hr/>
            <br/> <p style={{textAlign:'center', fontSize:'small'}}>&copy; Shikhar Sharma 2026</p>
        </div>
    )
}

export default EmployeeRegister;
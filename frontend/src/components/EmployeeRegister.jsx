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

                        {/* Dynamic Course */}
                        <label htmlFor="course"><span className='asterik'>*</span>Course: </label>
                        <select name="course" id="course" value={formData.course} onChange={handleChange} required>
                            <option value="">-- select course --</option>
                            {availableCourses.map(c => (
                                <option key={c.id} value={c.courseName}>
                                    {c.courseName.toUpperCase()}
                                </option>
                            ))}
                        </select>
                        <span className='error'>
                            {errors.course && <span>{errors.course}</span>}
                        </span>

                        {/* Dynamic Department */}
                        <label htmlFor="department"><span className='asterik'>*</span>Department: </label>
                        <select name="department" id="department" value={formData.department} onChange={handleChange} required>
                            <option value="">-- Select Department --</option>
                            {departments.map(dept => (
                                <option key={dept.id} value={dept.deptName}>
                                    {dept.deptName.toUpperCase()} ({dept.deptCode})
                                </option>
                            ))}
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
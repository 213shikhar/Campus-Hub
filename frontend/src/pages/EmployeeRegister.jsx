import axios from "axios";
import React, {useState} from "react";
import { Link, ScrollRestoration, useNavigate } from "react-router-dom";

const EmployeeRegister = () => {
    const navigate = useNavigate();
    
    const [employee, setEmployee] = useState({
        type: "",
        course: "",
        department: "",
        eid: "",
        employeeName: "",
        mobile: "",
        email: "",
        address: "",
        password: "",
        photo: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setEmployee({
            ...employee,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Sending Data:", employee);

        try{
            const response = await axios.post("http://localhost:8080/api/employees/register", employee);
            alert("Employee registered successfully!");

            // 2. Determine where to navigate based on the Employee Type
            // Note: Ensure these case strings match the value="" in your <select> tag exactly.
            switch (employee.type) {
                case "faculty":
                    navigate('/faculty-dashboard', { state: { user: employee } });
                    break;
                
                case "hod":
                    navigate('/hod-dashboard', { state: { user: employee } });
                    break;

                case "examController":
                    navigate('/exam-contr-dashboard', { state: { user: employee } });
                    break;
                
                case "registrar": 
                    navigate('/registrar-dashboard', { state: { user: employee } });
                    break;

                default:
                    // Fallback if type is not recognized or generic
                    alert("Registration successful, but no specific dashboard found for this role.");
                    navigate('/'); 
            }
        }
        catch (error){
            console.error("Error: ", error);
            alert("Registration Failed!");
        }
    };

    return(
        <div>
            <h1 style={{textAlign:'center'}}>Inderprastha Engineering College, Ghaziabad</h1>
            <br/><hr/>
            <div className='main-container'>
                <h2 style={{textAlign:'center'}}>Employee Registration</h2><br/>
                
                <div className='form-container'>
                    <form className='login-form' onSubmit={handleSubmit}>
                        
                        <label htmlFor="type">Type: </label>
                        <select name="type" id="type" value={employee.type} onChange={handleChange} required>
                            <option value="">-- select type --</option>
                            <option value="faculty" >Faculty</option>
                            <option value="hod" >HOD</option>
                            <option value="examController" >Exam Controller</option>
                        </select>

                        <label htmlFor="course">Course: </label>
                        <select name="course" id="course" value={employee.course} onChange={handleChange} required>
                            <option value="">-- select course --</option>
                            <option value="btech" >B.Tech</option>
                            <option value="mtech" >M.Tech</option>
                            <option value="bca" >BCA</option>
                            <option value="mca" >MCA</option>
                        </select>
                        
                        <label htmlFor="department">Department: </label>
                        <select name="department" id="department" value={employee.department} onChange={handleChange} required>
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
                        
                        <label htmlFor="eid">Employee ID: </label>
                        <input type="text" name="eid" id="eid" value={employee.eid} onChange={handleChange} required/>
                        
                        <label htmlFor="employeeName">Employee Name: </label>
                        <input type="text" name="employeeName" id="employeeName" value={employee.employeeName} onChange={handleChange} required/>
                        
                        <label htmlFor="mobile">Mobile No: </label>
                        <input type="number" name="mobile" id="mobile" value={employee.mobile} onChange={handleChange} required/>

                        <label htmlFor="email">Email: </label>
                        <input type="email" name="email" id="email" value={employee.email} onChange={handleChange} required/>
                        
                        <label htmlFor="address">Address: </label>
                        <textarea type="text" name="address" id="address" rows={5} cols={30} value={employee.address} onChange={handleChange} required/>

                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" id="password" value={employee.password} onChange={handleChange} required/>
                        
                        <label htmlFor="confirmPassword">Confirm Password: </label>
                        <input type="password" name="confirmPassword" id="confirmPassword" required/>

                        <label htmlFor="photo">Photo: </label>
                        <input type="file" name="photo" id="photo" value={employee.photo} onChange={handleChange} />
                        <br/><p style={{fontSize:'small'}}><u>Note:</u> filename should be like <b>Firstname_Lastname</b>.
                        <br/>Size: <b>50KB - 100KB</b></p>
                        
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
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate


const StudentRegister = () => {
    // write the axios code here
    // 2. Initialize the navigate hook
    const navigate = useNavigate();

    const [student, setStudent] = useState({
        session: "",
        course: "",
        branch: "",
        admissionNo: "",
        studentname: "",
        mobile: "",
        email: "",
        address: "",
        password: "",
        photo: ""
    });

    // handle change function
    const handleChange = (e) => {
        const {name, value} = e.target;
        setStudent({
            ...student, // keep existing values
            [name]: value   // updates only changed field
        });
    };

    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Sending Data:", student);

        try {
            await axios.post("http://localhost:8080/api/students/register", student);
            
            // 3. Success Feedback
            alert("Student Registered Successfully!");
            
            // 4. Redirect to Dashboard with the student's name
            // We pass 'studentName' in the state object so the Dashboard can read it
            navigate('/student-dashboard', { 
                state: { studentName: student.studentname } 
            });

            // Note: We don't need to reset the form here anymore 
            // because the user is moving to a new page.
        }
        catch (error) {
            console.error("Error:", error);
            alert("Registration Failed!");
        }
    };

    return(
        <div>
            <h1 style={{textAlign:'center'}}>Inderprastha Engineering College, Ghaziabad</h1>
            <br/><hr/>
            <div className='main-container'>
                <h2 style={{textAlign:'center'}}>Student Registration</h2><br/>
                <div className='form-container'>
                    <form className='register-form' onSubmit={handleSubmit}>
                        
                        <label htmlFor="session">Session: </label>
                        <select name="session" id="session" value={student.session} onChange={handleChange} required>
                            <option value="">-- select session --</option>
                            <option value="2025-2029" >2025-2029</option>
                            <option value="2029-2033" >2029-2033</option>
                            <option value="2033-2037" >2033-2037</option>
                        </select>

                        <label htmlFor="course">Course: </label>
                        <select name="course" id="course" value={student.course} onChange={handleChange} required>
                            <option value="">-- select course --</option>
                            <option value="btech" >B.Tech</option>
                            <option value="mtech" >M.Tech</option>
                            <option value="bca" >BCA</option>
                            <option value="mca" >MCA</option>
                        </select>
                        
                        <label htmlFor="branch">Branch: </label>
                        <select name="branch" id="branch" value={student.branch} onChange={handleChange} required>
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
                        
                        <label htmlFor="admissionNo">Admission No: </label>
                        <input type="number" name="admissionNo" id="admissionNo" value={student.admissionNo} onChange={handleChange} required/>
                        
                        <label htmlFor="studentname">Student Name: </label>
                        <input type="text" name="studentname" id="studentname" value={student.studentname} onChange={handleChange} required/>
                        
                        <label htmlFor="mobile">Mobile No: </label>
                        <input type="number" name="mobile" id="mobile" value={student.mobile} onChange={handleChange} required/>

                        <label htmlFor="email">Email: </label>
                        <input type="email" name="email" id="email" value={student.email} onChange={handleChange} required/>
                        
                        <label htmlFor="address">Address: </label>
                        <textarea type="text" name="address" id="address" rows={5} cols={30} value={student.address} onChange={handleChange} required/>

                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" id="password" value={student.password} onChange={handleChange} required/>
                        
                        <label htmlFor="confirmPassword">Confirm Password: </label>
                        <input type="password" name="password" id="confirmPassword" required/>

                        <label htmlFor="photo">Photo: </label>
                        <input type="file" name="photo" id="photo" value={student.photo} onChange={handleChange} />
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

export default StudentRegister;
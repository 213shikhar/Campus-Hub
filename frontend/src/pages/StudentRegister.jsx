import { Link } from "react-router-dom";

const StudentRegister = () => {
    return(
        <div>
            <h1 style={{textAlign:'center'}}>Inderprastha Engineering College, Ghaziabad</h1>
            <br/><hr/>
            <div className='main-container'>
                <h2 style={{textAlign:'center'}}>Student Registration</h2><br/>
                <div className='form-container'>
                    <form className='login-form' action="#">
                        
                        <label htmlFor="session">Session: </label>
                        <select name="session" id="session" required>
                            <option value="">-- select session --</option>
                            <option value="2025-2029" >2025-2029</option>
                            <option value="2029-2033" >2029-2033</option>
                            <option value="2033-2037" >2033-2037</option>
                        </select>

                        <label htmlFor="course">Course: </label>
                        <select name="course" id="course" required>
                            <option value="">-- select course --</option>
                            <option value="btech" >B.Tech</option>
                            <option value="mtech" >M.Tech</option>
                            <option value="bca" >BCA</option>
                            <option value="mca" >MCA</option>
                        </select>
                        
                        <label htmlFor="branch">Branch: </label>
                        <select name="branch" id="branch" required>
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
                        <input type="number" name="admissionNo" id="admissionNo" required/>
                        
                        <label htmlFor="studentname">Student Name: </label>
                        <input type="text" name="studentname" id="studentname" required/>
                        
                        <label htmlFor="mobile">Mobile No: </label>
                        <input type="number" name="mobile" id="mobile" required/>

                        <label htmlFor="email">Email: </label>
                        <input type="email" name="email" id="email" required/>
                        
                        <label htmlFor="address">Address: </label>
                        <textarea type="text" name="address" id="address" rows={5} cols={30} required/>

                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" id="password" required/>
                        
                        <label htmlFor="confirmPassword">Confirm Password: </label>
                        <input type="password" name="password" id="confirmPassword" required/>

                        <label htmlFor="photo">Photo: </label>
                        <input type="file" name="photo" id="photo" required/>
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
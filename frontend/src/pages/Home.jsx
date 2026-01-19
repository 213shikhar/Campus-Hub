import { Routes, Route, Link} from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import Login from "./Login";
import Register from "./StudentRegister";

const Home = () => {
    return(
        <div>
            {/* <Header/> */}
            <h1 style={{textAlign:'center'}}>Welcome to CampusHub</h1><br/>
            <hr/>
            <div className='main-container'>
                <h2 style={{textAlign:'center'}}>Inderprastha Engineering College, Ghaziabad</h2>
                <div className='form-container'>
                    <form className='login-form' action="#">
                        <label htmlFor="role">Role: </label>
                        <select name="role" id="role" required>
                            <option value="">-- select role --</option>
                            <option value="student" >Registrar</option>
                            <option value="student" >Student</option>
                            <option value="employee" >Employee</option>
                            <option value="parent" >Parent</option>
                        </select>
                    
                        <label htmlFor="userid">User ID: </label>
                        <input type="text" name="userid" id="userid" required/>
                    
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" id="password" required/>
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
            <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    )
}

export default Home;
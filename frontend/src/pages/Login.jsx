import { Link } from "react-router-dom";
const Login = () => {
    return(
        <div>
            <h1 style={{textAlign:'center'}}>Welcome to CampusHub</h1><hr/><br/>
            <h2>Please Login!</h2>
            <hr/><br/>
            <div>
                <form action="#">
                    <label htmlFor="role">Role: </label>
                    <select name="role" id="role">
                        <option value="" disabled selected>-- select role --</option>
                        <option value="admin">Admin</option>
                        <option value="student">Student</option>
                        <option value="employee">Employee</option>
                        <option value="parent">Parent</option>
                    </select><br/>

                    <label htmlFor="userid">User ID: </label>
                    <input type="number" name="userid" id="userid" placeholder=" User ID"/><br/>
                    
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" placeholder=" Password"/><br/><br/>

                    <input type="submit"/>
                </form><br/>
                <p>New User? <Link style={{textDecoration:'none'}} to="/register">Register Here</Link>!</p>
            </div>
        </div>
    )
}

export default Login;
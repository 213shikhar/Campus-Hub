import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../DashboardStyling.css';

const RegistrarDashboard = () => {
    
    const location = useLocation();
    const navigate = useNavigate();

    // 1. Get the data passed from the Login screen
    const registrar = location.state?.admin;

    // 2. Get the fallback ID from Local Storage (needed if page is refreshed)
    const storedUserId = localStorage.getItem('userId');

    const handleLogout = () => {
        navigate('/');
    };
    
    return(
        <div>
            <header className='header'>
                <h1>Center for Development of Advanced Computing, Noida</h1>
                <button onClick={handleLogout} className='logoutBtn'>Logout</button>
            </header>
            <main className='main'>
                <h2><strong>Hello, </strong>{registrar ? registrar.userId : storedUserId}!</h2>
            </main>
            <hr/><br/>
            <p><Link to="/addCourse">Add/Modify Course</Link></p><br/>
            <p><Link to="/addDepartment">Add/Modify Department</Link></p><br/>
            <p><Link to="/addSubjects">Add/Modify Subjects</Link></p><br/>
            <p><Link to="/viewEmployees">View Employees</Link></p><br/>
            <p><Link to="/viewStudents">View Students</Link></p><br/>
            <p><Link to="/viewFeedback">View Feedback</Link></p><br/>
        </div>
    )
};

export default RegistrarDashboard;
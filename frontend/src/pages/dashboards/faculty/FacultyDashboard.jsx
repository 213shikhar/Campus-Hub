import React, { useEffect } from 'react';
// these are router hooks for managing url state
import { useLocation, useNavigate } from "react-router-dom";
import '../DashboardStyling.css';

const FacultyDashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const faculty = location.state?.employee;
    // Security Check
    // If no user data is found redirect to login
    useEffect(
      () => {
        if(!faculty) {
            console.error("Dashboard access denied: No faculty data in state.");
            alert("No faculty data found. Please Login!");
            navigate('/');
      }
    }, [faculty, navigate]);

    if (!faculty) return null;

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
                <h2><strong>Hello, </strong>{faculty.employeeName}!</h2>
                <p><strong>Employee ID: </strong>{faculty.eid}</p>
                <p><strong>Department: </strong>{faculty.department}</p>
            </main>
            <hr/>
        </div>
    );
}

export default FacultyDashboard;
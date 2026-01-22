import React from "react";
// these are router hooks for managing url state
import { useLocation, useNavigate } from "react-router-dom";
import './DashboardStyling.css';

const EmployeeDashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // catching the employee name
    const employeeName = location.state?.employeeName || "Employee";

    const handleLogout = () => {
        navigate('/');
    };

    return(
        <div>
            <header className='header'>
                <h1>Inderprastha Engineering College</h1>
                <button onClick={handleLogout} className='logoutBtn'>Logout</button>
            </header>
            <main className='main'>
                <h2>Hello, {employeeName}</h2>
            </main>
        </div>
    );
}

export default EmployeeDashboard;
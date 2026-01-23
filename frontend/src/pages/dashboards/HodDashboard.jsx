import React, {useState} from "react";
// these are router hooks for managing url state
import { useLocation, useNavigate } from "react-router-dom";
import './DashboardStyling.css';

const HodDashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const user = location.state?.employee;
    // Security Check
    // If no user data is found redirect to login
    React.useEffect(
      () => {
        if(!user) {
          alert("No user data found. Please Login!");
          navigate('/');
      }
    }, [user, navigate]);

    if (!user) return null;

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
                <h2>Hello, {user.employeeName}</h2>
                <p>Department: {user.department}</p>
                <p>Employee ID: {user.eid}</p>
            </main>
            <hr/>
        </div>
    );

}

export default HodDashboard;
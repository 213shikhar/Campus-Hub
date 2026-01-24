import React, {useState} from "react";
// these are router hooks for managing url state
import { useLocation, useNavigate } from "react-router-dom";
import '../DashboardStyling.css';

const HodDashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const hod = location.state?.employee;
    // Security Check
    // If no hod data is found redirect to login
    React.useEffect(
      () => {
        if(!hod) {
          alert("No HOD data found. Please Login!");
          navigate('/');
      }
    }, [hod, navigate]);

    if (!hod) return null;

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
                <h2>Hello, {hod.employeeName}</h2>
                <p>Department: {hod.department}</p>
                <p>Employee ID: {hod.eid}</p>
            </main>
            <hr/>
        </div>
    );

}

export default HodDashboard;
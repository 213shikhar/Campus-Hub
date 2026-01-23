import React, {useState} from "react";
// these are router hooks for managing url state
import { useLocation, useNavigate } from "react-router-dom";
import './DashboardStyling.css';

const ExamControllerDashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const examController = location.state?.employee;
    // Security Check
    // If no examController data is found redirect to login
    React.useEffect(
      () => {
        if(!examController) {
          alert("No examController data found. Please Login!");
          navigate('/');
      }
    }, [examController, navigate]);

    if (!examController) return null;

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
                <h2>Hello, {examController.employeeName}</h2>
                <p>Employee ID: {examController.eid}</p>
            </main>
            <hr/>
        </div>
    );
}

export default ExamControllerDashboard;
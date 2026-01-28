import React, {useState} from "react";
// these are router hooks for managing url state
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../DashboardStyling.css';

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
            <hr/><br/>
            <p><Link to="/examContrProfile">Profile</Link></p><br/>
            <p><Link to="/uploadNotice">Notice Board</Link></p><br/>
            <p><Link to="/createExamSchedule">Create Exam Schedule</Link></p><br/>
            {/* <p><Link to="/studentExamSchedule">View Exam Schedule</Link></p><br/> */}
            <p><Link to="/createSeatingPlan">Create Seating Plan</Link></p><br/>
            <p><Link to="/generateAdmitCard">Generate Admit Card</Link></p><br/>
            <p><Link to="/feedback">Feedback</Link></p><br/>
            <p><Link to="/changePassword">Change Password</Link></p><br/>
        </div>
    );
}

export default ExamControllerDashboard;
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../DashboardStyling.css';
// these are router hooks for managing url state

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
            <hr/><br/>
            <p><Link to="/facultyProfile">Profile</Link></p><br/>
            <p><Link to="/uploadNotice">Notice</Link></p><br/>
            <p><Link to="/viewSchedule">View Schedule</Link></p><br/>
            <p><Link to="/uploadAttendance">Upload Attendance</Link></p><br/>
            <p><Link to="/uploadMarks">Upload Student Marks</Link></p><br/>
            {/* <p><Link to="/uploadMaterial">Upload Study Material</Link></p><br/> */}
            <p><Link to="/studentMarks">View Student Marks</Link></p><br/>
            <p><Link to="/studentAttendance">View Student Attendance</Link></p><br/>
            <p><Link to="/feedback">Feedback</Link></p><br/>
            <p><Link to="/changePassword">Change Password</Link></p><br/>
        </div>
    );
}

export default FacultyDashboard;
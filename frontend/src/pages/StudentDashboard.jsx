// StudentDashboard.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './DashboardStyling.css';

const StudentDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Access the studentName passed from the previous page
  // We use optional chaining (?.) and a fallback "Student" in case they accessed this page directly
  const studentName = location.state?.studentName || "Student";

  const handleLogout = () => {
    // Clear any stored tokens if you use them
    // localStorage.removeItem('token'); 
    navigate('/');
  };

  return (
    <div>
      <header className='header'>
        <h1>Inderprastha Engineering College</h1>
        <button onClick={handleLogout} className='logoutBtn'>Logout</button>
      </header>
      <main className='main'>
        <h2>Hello, {studentName}</h2>
      </main>
    </div>
  );
};

export default StudentDashboard;
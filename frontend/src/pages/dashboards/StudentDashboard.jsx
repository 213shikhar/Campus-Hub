// StudentDashboard.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './DashboardStyling.css';

const StudentDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Retrieve the user object from navigation state
  // Use optional chaining (?.) to prevent crashing if someone goes directly to the URL
  const user = location.state?.user;
  
  // 2. Security Check
  // If no user data is found (e.g., user refreshed the page or typed url directly), redirect to login
  React.useEffect(() => {
      if (!user) {
          alert("No user data found. Please login.");
          navigate('/');
      }
  }, [user, navigate]);
  
  if (!user) return null; // Don't render anything while redirecting

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
        <h2>Hello, {user.studentname}!</h2>
        <p>Admission No: {user.admissionNo}</p>
      </main>
      <hr/>
    </div>
  );
};

export default StudentDashboard;
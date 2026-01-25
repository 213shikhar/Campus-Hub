// StudentDashboard.jsx
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../DashboardStyling.css';

const StudentDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Retrieve the student object using the correct key 'student'
  // We check location.state first to avoid errors if state is null
  const student = location.state?.student;

  // 2. Security Check
  // If no student data is found, redirect to login
  useEffect(() => {
      if (!student) {
          // Optional: Add a small delay or console log for debugging
          console.error("Dashboard access denied: No student data in state.");
          alert("No user data found. Please login.");
          navigate('/');
      }
  }, [student, navigate]);

  // Don't render anything while checking or redirecting
  if (!student) return null; 

  const handleLogout = () => {
    // Clear session/local storage if used
    navigate('/');
  };

  return (
    <div>
      <header className='header'>
        <h1>Center for Development of Advanced Computing, Noida</h1>
        <button onClick={handleLogout} className='logoutBtn'>Logout</button>
      </header>

      <main className='main'>
        {/* Access properties using 'student' variable */}
        <h2>Hello, {student.studentname}!</h2>
        <p><strong>Admission No:</strong> {student.admissionNo}</p>
        <p><strong>Course:</strong> {student.course.toUpperCase()}</p>
        <p><strong>Branch:</strong> {student.branch.toUpperCase()}</p>
      </main>
      <hr/><br/>
      <p><Link to="/studentProfile">Profile</Link></p><br/>
      <p><Link to="/viewNotice">Notice Board</Link></p><br/>
      <p><Link to="/studentMarks">View Marks</Link></p><br/>
      <p><Link to="/studentAttendance">View Attendance</Link></p><br/>
      <p><Link to="/studentAssignment">View Assignments</Link></p><br/>
      <p><Link to="/studentClassSchedule">View Class Schedule</Link></p><br/>
      <p><Link to="/studentExamSchedule">View Exam Schedule</Link></p><br/>
      <p><Link to="/studyMaterial">Study Material</Link></p><br/>
      <p><Link to="/studentFeedback">Feedback</Link></p><br/>
      <p><Link to="/changePassword">Change Password</Link></p><br/>

    </div>
  );
};

export default StudentDashboard;
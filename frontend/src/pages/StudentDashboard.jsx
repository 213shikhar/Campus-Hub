// StudentDashboard.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>CampusHub</h1>
        <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
      </header>

      <main style={styles.main}>
        {/* Dynamic Greeting */}
        <h2>Hello, {studentName}</h2>
        
        <div style={styles.cardContainer}>
          <div style={styles.card}>
            <h3>Your Profile</h3>
            <p>View and edit your details.</p>
          </div>
          <div style={styles.card}>
            <h3>Enrolled Courses</h3>
            <p>Check your current semester subjects.</p>
          </div>
          <div style={styles.card}>
            <h3>Notices</h3>
            <p>No new announcements.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

// Simple inline styles for demonstration
const styles = {
  container: { fontFamily: 'Arial, sans-serif', padding: '20px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '10px' },
  logoutBtn: { backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '8px 16px', cursor: 'pointer', borderRadius: '4px' },
  main: { marginTop: '20px' },
  cardContainer: { display: 'flex', gap: '20px', marginTop: '20px' },
  card: { border: '1px solid #ddd', padding: '20px', borderRadius: '8px', width: '200px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }
};

export default StudentDashboard;
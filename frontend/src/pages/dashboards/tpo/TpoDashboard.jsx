import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../DashboardStyling.css';

const TpoDashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // 1. Get the data passed from the Login screen
    const tpo = location.state?.admin;

    // 2. Get the fallback ID from Local Storage (needed if page is refreshed)
    const storedUserId = localStorage.getItem('userId');

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
                <h2><strong>Hello, </strong>{tpo ? tpo.userId : storedUserId}!</h2>
            </main>
            <hr/><br/>
            <p><Link to="/uploadNotice">Upload Placement Notice</Link></p><br/>
            <p><Link to="/viewBatchList">Batch List</Link></p><br/>
            <p><Link to="/viewPlacementRecord">Placement Record</Link></p><br/>
        </div>
    )
};

export default TpoDashboard;
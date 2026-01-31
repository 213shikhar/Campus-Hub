import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
        <div className="min-vh-100 d-flex flex-column bg-light">
    {/* Header with Logout */}
    <header className="bg-primary text-white py-3 shadow-sm">
        <div className="container">
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="h4 mb-0 fw-bold">Center for Development of Advanced Computing, Noida</h1>
                <button 
                    onClick={handleLogout} 
                    className="btn btn-light btn-sm fw-semibold transition-all"
                    style={{transition: 'all 0.3s ease'}}
                >
                    <i className="bi bi-box-arrow-right me-1"></i> Logout
                </button>
            </div>
        </div>
    </header>

    {/* Faculty Info Section */}
    <div className="bg-white shadow-sm py-4 mb-4">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-12">
                    <h2 className="h3 mb-3">
                        <strong className="text-primary">Hello,</strong> <span className="text-dark">{faculty.employeeName}!</span>
                    </h2>
                    <div className="row g-3">
                        <div className="col-auto">
                            <span className="badge bg-secondary px-3 py-2">
                                <i className="bi bi-person-badge me-1"></i>
                                <strong>Employee ID:</strong> {faculty.eid}
                            </span>
                        </div>
                        <div className="col-auto">
                            <span className="badge bg-info px-3 py-2">
                                <i className="bi bi-building me-1"></i>
                                <strong>Department:</strong> {faculty.department}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* Main Dashboard Content */}
    <main className="container my-5 flex-grow-1">
        <div className="row justify-content-center">
            <div className="col-12 col-lg-11 col-xl-10">
                <div className="card shadow-lg border-0 rounded-4">
                    <div className="card-body p-4 p-md-5">
                        <h3 className="text-center mb-4 fw-semibold text-primary">Faculty Dashboard</h3>
                        
                        <div className="row g-3">
                            {/* Profile */}
                            <div className="col-md-6 col-lg-4">
                                <Link 
                                    to="/employeeProfile" 
                                    className="card border-0 shadow-sm h-100 text-decoration-none transition-all hover-card"
                                    style={{transition: 'all 0.3s ease'}}
                                >
                                    <div className="card-body p-4 text-center">
                                        <div className="mb-3">
                                            <i className="bi bi-person-circle fs-1 text-primary"></i>
                                        </div>
                                        <h5 className="card-title text-dark mb-2">Profile</h5>
                                        <p className="card-text text-muted small">View & edit your profile</p>
                                    </div>
                                </Link>
                            </div>

                            {/* Notice */}
                            <div className="col-md-6 col-lg-4">
                                <Link 
                                    to="/uploadNotice" 
                                    className="card border-0 shadow-sm h-100 text-decoration-none transition-all hover-card"
                                    style={{transition: 'all 0.3s ease'}}
                                >
                                    <div className="card-body p-4 text-center">
                                        <div className="mb-3">
                                            <i className="bi bi-megaphone fs-1 text-warning"></i>
                                        </div>
                                        <h5 className="card-title text-dark mb-2">Notice</h5>
                                        <p className="card-text text-muted small">Post announcements</p>
                                    </div>
                                </Link>
                            </div>

                            {/* View Schedule */}
                            <div className="col-md-6 col-lg-4">
                                <Link 
                                    to="/viewSchedule" 
                                    className="card border-0 shadow-sm h-100 text-decoration-none transition-all hover-card"
                                    style={{transition: 'all 0.3s ease'}}
                                >
                                    <div className="card-body p-4 text-center">
                                        <div className="mb-3">
                                            <i className="bi bi-calendar2-week fs-1 text-info"></i>
                                        </div>
                                        <h5 className="card-title text-dark mb-2">View Schedule</h5>
                                        <p className="card-text text-muted small">Check class timetable</p>
                                    </div>
                                </Link>
                            </div>

                            {/* Upload Attendance */}
                            <div className="col-md-6 col-lg-4">
                                <Link 
                                    to="/uploadAttendance" 
                                    className="card border-0 shadow-sm h-100 text-decoration-none transition-all hover-card"
                                    style={{transition: 'all 0.3s ease'}}
                                >
                                    <div className="card-body p-4 text-center">
                                        <div className="mb-3">
                                            <i className="bi bi-calendar-check fs-1 text-success"></i>
                                        </div>
                                        <h5 className="card-title text-dark mb-2">Upload Attendance</h5>
                                        <p className="card-text text-muted small">Mark student attendance</p>
                                    </div>
                                </Link>
                            </div>

                            {/* Upload Marks */}
                            <div className="col-md-6 col-lg-4">
                                <Link 
                                    to="/uploadMarks" 
                                    className="card border-0 shadow-sm h-100 text-decoration-none transition-all hover-card"
                                    style={{transition: 'all 0.3s ease'}}
                                >
                                    <div className="card-body p-4 text-center">
                                        <div className="mb-3">
                                            <i className="bi bi-clipboard-plus fs-1 text-danger"></i>
                                        </div>
                                        <h5 className="card-title text-dark mb-2">Upload Student Marks</h5>
                                        <p className="card-text text-muted small">Enter exam results</p>
                                    </div>
                                </Link>
                            </div>

                            {/* Upload Study Material */}
                            <div className="col-md-6 col-lg-4">
                                <Link 
                                    to="/uploadMaterial" 
                                    className="card border-0 shadow-sm h-100 text-decoration-none transition-all hover-card"
                                    style={{transition: 'all 0.3s ease'}}
                                >
                                    <div className="card-body p-4 text-center">
                                        <div className="mb-3">
                                            <i className="bi bi-upload fs-1 text-secondary"></i>
                                        </div>
                                        <h5 className="card-title text-dark mb-2">Upload Study Material</h5>
                                        <p className="card-text text-muted small">Share resources</p>
                                    </div>
                                </Link>
                            </div>

                            {/* View Student Marks */}
                            <div className="col-md-6 col-lg-4">
                                <Link 
                                    to="/studentMarks" 
                                    className="card border-0 shadow-sm h-100 text-decoration-none transition-all hover-card"
                                    style={{transition: 'all 0.3s ease'}}
                                >
                                    <div className="card-body p-4 text-center">
                                        <div className="mb-3">
                                            <i className="bi bi-clipboard-data fs-1 text-primary"></i>
                                        </div>
                                        <h5 className="card-title text-dark mb-2">View Student Marks</h5>
                                        <p className="card-text text-muted small">Check submitted marks</p>
                                    </div>
                                </Link>
                            </div>

                            {/* View Student Attendance */}
                            <div className="col-md-6 col-lg-4">
                                <Link 
                                    to="/studentAttendance" 
                                    className="card border-0 shadow-sm h-100 text-decoration-none transition-all hover-card"
                                    style={{transition: 'all 0.3s ease'}}
                                >
                                    <div className="card-body p-4 text-center">
                                        <div className="mb-3">
                                            <i className="bi bi-bar-chart fs-1 text-success"></i>
                                        </div>
                                        <h5 className="card-title text-dark mb-2">View Student Attendance</h5>
                                        <p className="card-text text-muted small">Track attendance records</p>
                                    </div>
                                </Link>
                            </div>

                            {/* Feedback */}
                            <div className="col-md-6 col-lg-4">
                                <Link 
                                    to="/feedback" 
                                    className="card border-0 shadow-sm h-100 text-decoration-none transition-all hover-card"
                                    style={{transition: 'all 0.3s ease'}}
                                >
                                    <div className="card-body p-4 text-center">
                                        <div className="mb-3">
                                            <i className="bi bi-chat-left-dots fs-1 text-warning"></i>
                                        </div>
                                        <h5 className="card-title text-dark mb-2">Feedback</h5>
                                        <p className="card-text text-muted small">Share your feedback</p>
                                    </div>
                                </Link>
                            </div>

                            {/* Change Password */}
                            <div className="col-md-6 col-lg-4">
                                <Link 
                                    to="/changePassword" 
                                    className="card border-0 shadow-sm h-100 text-decoration-none transition-all hover-card"
                                    style={{transition: 'all 0.3s ease'}}
                                >
                                    <div className="card-body p-4 text-center">
                                        <div className="mb-3">
                                            <i className="bi bi-key fs-1 text-danger"></i>
                                        </div>
                                        <h5 className="card-title text-dark mb-2">Change Password</h5>
                                        <p className="card-text text-muted small">Update your password</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    {/* Footer */}
    <footer className="bg-dark text-white py-3 mt-auto">
        <div className="container">
            <p className="text-center mb-0 small">&copy; CampusHub 2026</p>
        </div>
    </footer>
</div>
    );
}

export default FacultyDashboard;
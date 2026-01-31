// StudentDashboard.jsx
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

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

    {/* Student Info Section */}
    <div className="bg-white shadow-sm py-4 mb-4">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-12">
                    <h2 className="h3 mb-3">
                        <strong className="text-primary">Hello,</strong> <span className="text-dark">{student.studentname}!</span>
                    </h2>
                    <div className="row g-3">
                        <div className="col-auto">
                            <span className="badge bg-secondary px-3 py-2">
                                <i className="bi bi-person-badge me-1"></i>
                                <strong>Admission:</strong> {student.admissionNo}
                            </span>
                        </div>
                        <div className="col-auto">
                            <span className="badge bg-info px-3 py-2">
                                <i className="bi bi-mortarboard me-1"></i>
                                <strong>Course:</strong> {student.course.toUpperCase()}
                            </span>
                        </div>
                        <div className="col-auto">
                            <span className="badge bg-success px-3 py-2">
                                <i className="bi bi-diagram-3 me-1"></i>
                                <strong>Branch:</strong> {student.branch.toUpperCase()}
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
                        <h3 className="text-center mb-4 fw-semibold text-primary">Student Dashboard</h3>
                        
                        <div className="row g-3">
                            {/* Profile */}
                            <div className="col-md-6 col-lg-4">
                                <Link 
                                    to="/studentProfile" 
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

                            {/* Notice Board */}
                            <div className="col-md-6 col-lg-4">
                                <Link 
                                    to="/viewNotice" 
                                    className="card border-0 shadow-sm h-100 text-decoration-none transition-all hover-card"
                                    style={{transition: 'all 0.3s ease'}}
                                >
                                    <div className="card-body p-4 text-center">
                                        <div className="mb-3">
                                            <i className="bi bi-megaphone fs-1 text-warning"></i>
                                        </div>
                                        <h5 className="card-title text-dark mb-2">Notice Board</h5>
                                        <p className="card-text text-muted small">Latest announcements</p>
                                    </div>
                                </Link>
                            </div>

                            {/* View Marks */}
                            <div className="col-md-6 col-lg-4">
                                <Link 
                                    to="/studentMarks" 
                                    className="card border-0 shadow-sm h-100 text-decoration-none transition-all hover-card"
                                    style={{transition: 'all 0.3s ease'}}
                                >
                                    <div className="card-body p-4 text-center">
                                        <div className="mb-3">
                                            <i className="bi bi-clipboard-data fs-1 text-success"></i>
                                        </div>
                                        <h5 className="card-title text-dark mb-2">View Marks</h5>
                                        <p className="card-text text-muted small">Check your grades</p>
                                    </div>
                                </Link>
                            </div>

                            {/* View Attendance */}
                            <div className="col-md-6 col-lg-4">
                                <Link 
                                    to="/studentAttendance" 
                                    className="card border-0 shadow-sm h-100 text-decoration-none transition-all hover-card"
                                    style={{transition: 'all 0.3s ease'}}
                                >
                                    <div className="card-body p-4 text-center">
                                        <div className="mb-3">
                                            <i className="bi bi-calendar-check fs-1 text-info"></i>
                                        </div>
                                        <h5 className="card-title text-dark mb-2">View Attendance</h5>
                                        <p className="card-text text-muted small">Track your attendance</p>
                                    </div>
                                </Link>
                            </div>

                            {/* View Assignments */}
                            <div className="col-md-6 col-lg-4">
                                <Link 
                                    to="/studentAssignment" 
                                    className="card border-0 shadow-sm h-100 text-decoration-none transition-all hover-card"
                                    style={{transition: 'all 0.3s ease'}}
                                >
                                    <div className="card-body p-4 text-center">
                                        <div className="mb-3">
                                            <i className="bi bi-file-earmark-text fs-1 text-danger"></i>
                                        </div>
                                        <h5 className="card-title text-dark mb-2">View Assignments</h5>
                                        <p className="card-text text-muted small">Pending assignments</p>
                                    </div>
                                </Link>
                            </div>

                            {/* View Class Schedule */}
                            <div className="col-md-6 col-lg-4">
                                <Link 
                                    to="/studentClassSchedule" 
                                    className="card border-0 shadow-sm h-100 text-decoration-none transition-all hover-card"
                                    style={{transition: 'all 0.3s ease'}}
                                >
                                    <div className="card-body p-4 text-center">
                                        <div className="mb-3">
                                            <i className="bi bi-calendar2-week fs-1 text-secondary"></i>
                                        </div>
                                        <h5 className="card-title text-dark mb-2">Class Schedule</h5>
                                        <p className="card-text text-muted small">View timetable</p>
                                    </div>
                                </Link>
                            </div>

                            {/* View Exam Schedule */}
                            <div className="col-md-6 col-lg-4">
                                <Link 
                                    to="/studentExamSchedule" 
                                    className="card border-0 shadow-sm h-100 text-decoration-none transition-all hover-card"
                                    style={{transition: 'all 0.3s ease'}}
                                >
                                    <div className="card-body p-4 text-center">
                                        <div className="mb-3">
                                            <i className="bi bi-pencil-square fs-1 text-primary"></i>
                                        </div>
                                        <h5 className="card-title text-dark mb-2">Exam Schedule</h5>
                                        <p className="card-text text-muted small">Upcoming exams</p>
                                    </div>
                                </Link>
                            </div>

                            {/* Study Material */}
                            <div className="col-md-6 col-lg-4">
                                <Link 
                                    to="/studyMaterial" 
                                    className="card border-0 shadow-sm h-100 text-decoration-none transition-all hover-card"
                                    style={{transition: 'all 0.3s ease'}}
                                >
                                    <div className="card-body p-4 text-center">
                                        <div className="mb-3">
                                            <i className="bi bi-book fs-1 text-success"></i>
                                        </div>
                                        <h5 className="card-title text-dark mb-2">Study Material</h5>
                                        <p className="card-text text-muted small">Access resources</p>
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
};

export default StudentDashboard;
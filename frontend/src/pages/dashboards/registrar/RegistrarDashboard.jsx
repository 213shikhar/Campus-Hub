import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const RegistrarDashboard = () => {
    
    const location = useLocation();
    const navigate = useNavigate();

    // 1. Get the data passed from the Login screen
    const registrar = location.state?.admin;

    // 2. Get the fallback ID from Local Storage (needed if page is refreshed)
    const storedUserId = localStorage.getItem('userId');

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

    {/* Welcome Section */}
    <div className="bg-white shadow-sm py-4 mb-4">
        <div className="container">
            <h2 className="h3 mb-0">
                <strong className="text-primary">Hello,</strong> <span className="text-dark">{registrar ? registrar.userId : storedUserId}!</span>
            </h2>
        </div>
    </div>

    {/* Main Dashboard Content */}
    <main className="container my-5 flex-grow-1">
        <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
                <div className="card shadow-lg border-0 rounded-4">
                    <div className="card-body p-4 p-md-5">
                        <h3 className="text-center mb-4 fw-semibold text-primary">Registrar Dashboard</h3>
                        
                        <div className="row g-3">
                            {/* Add Course */}
                            <div className="col-md-6">
                                <Link 
                                    to="/addCourse" 
                                    className="card border-0 shadow-sm h-100 text-decoration-none transition-all hover-card"
                                    style={{transition: 'all 0.3s ease'}}
                                >
                                    <div className="card-body p-4 text-center">
                                        <div className="mb-3">
                                            <i className="bi bi-journal-plus fs-1 text-primary"></i>
                                        </div>
                                        <h5 className="card-title text-dark mb-2">Add Course</h5>
                                        <p className="card-text text-muted small">Create new academic courses</p>
                                    </div>
                                </Link>
                            </div>

                            {/* Add Department */}
                            <div className="col-md-6">
                                <Link 
                                    to="/addDepartment" 
                                    className="card border-0 shadow-sm h-100 text-decoration-none transition-all hover-card"
                                    style={{transition: 'all 0.3s ease'}}
                                >
                                    <div className="card-body p-4 text-center">
                                        <div className="mb-3">
                                            <i className="bi bi-building-add fs-1 text-success"></i>
                                        </div>
                                        <h5 className="card-title text-dark mb-2">Add Department</h5>
                                        <p className="card-text text-muted small">Register new departments</p>
                                    </div>
                                </Link>
                            </div>

                            {/* Add Subject */}
                            <div className="col-md-6">
                                <Link 
                                    to="/addSubjects" 
                                    className="card border-0 shadow-sm h-100 text-decoration-none transition-all hover-card"
                                    style={{transition: 'all 0.3s ease'}}
                                >
                                    <div className="card-body p-4 text-center">
                                        <div className="mb-3">
                                            <i className="bi bi-book-half fs-1 text-warning"></i>
                                        </div>
                                        <h5 className="card-title text-dark mb-2">Add Subject</h5>
                                        <p className="card-text text-muted small">Add subjects to courses</p>
                                    </div>
                                </Link>
                            </div>

                            {/* View Employees */}
                            <div className="col-md-6">
                                <Link 
                                    to="/viewEmployees" 
                                    className="card border-0 shadow-sm h-100 text-decoration-none transition-all hover-card"
                                    style={{transition: 'all 0.3s ease'}}
                                >
                                    <div className="card-body p-4 text-center">
                                        <div className="mb-3">
                                            <i className="bi bi-people fs-1 text-info"></i>
                                        </div>
                                        <h5 className="card-title text-dark mb-2">View Employees</h5>
                                        <p className="card-text text-muted small">Manage employee records</p>
                                    </div>
                                </Link>
                            </div>

                            {/* View Students */}
                            <div className="col-md-6">
                                <Link 
                                    to="/viewStudents" 
                                    className="card border-0 shadow-sm h-100 text-decoration-none transition-all hover-card"
                                    style={{transition: 'all 0.3s ease'}}
                                >
                                    <div className="card-body p-4 text-center">
                                        <div className="mb-3">
                                            <i className="bi bi-person-lines-fill fs-1 text-danger"></i>
                                        </div>
                                        <h5 className="card-title text-dark mb-2">View Students</h5>
                                        <p className="card-text text-muted small">Access student database</p>
                                    </div>
                                </Link>
                            </div>

                            {/* View Feedback */}
                            <div className="col-md-6">
                                <Link 
                                    to="/viewFeedback" 
                                    className="card border-0 shadow-sm h-100 text-decoration-none transition-all hover-card"
                                    style={{transition: 'all 0.3s ease'}}
                                >
                                    <div className="card-body p-4 text-center">
                                        <div className="mb-3">
                                            <i className="bi bi-chat-left-text fs-1 text-secondary"></i>
                                        </div>
                                        <h5 className="card-title text-dark mb-2">View Feedback</h5>
                                        <p className="card-text text-muted small">Review student feedback</p>
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
    )
};

export default RegistrarDashboard;
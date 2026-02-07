import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentProfile = () => {
    // ✅ State is named 'student'
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const admissionNo = localStorage.getItem("admissionNo");
        if (!admissionNo) {
            alert("Please login first");
            navigate('/');
            return;
        }

        axios.get(`http://localhost:8080/api/students/profile/${admissionNo}`)
            .then(res => {
                console.log("Profile Data:", res.data); 
                setStudent(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError("Failed to load profile data.");
                setLoading(false);
            });
    }, [navigate]);

    if (loading) return <div className="text-center mt-5">Loading Profile...</div>;
    if (error) return <div className="text-center mt-5 text-danger">{error}</div>;
    if (!student) return <div className="text-center mt-5">No profile data found.</div>;

    return (
        <div className="min-vh-100 d-flex flex-column bg-light py-5">
            <div className="container flex-grow-1">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-11 col-md-10 col-lg-9 col-xl-8 px-3 px-sm-4">
                        <button 
                            className="btn btn-outline-secondary mb-3 transition-all" 
                            onClick={() => navigate(-1)}
                            style={{transition: 'all 0.3s ease'}}
                        >
                            <i className="bi bi-arrow-left me-2"></i>Back
                        </button>

                        <div className="card shadow-lg border-0 rounded-4">
                            <div className="card-body p-4 p-md-5">
                                <div className="text-center mb-4">
                                    <div className="mb-3">
                                        {/* ✅ CHANGED profile.X to student.X */}
                                        {student.profileImage ? (
                                            <img 
                                                src={`data:image/jpeg;base64,${student.profileImage}`} 
                                                alt="Profile" 
                                                className="rounded-circle border border-3 border-primary"
                                                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <i className="bi bi-person-circle fs-1 text-primary" style={{fontSize: '150px'}}></i>
                                        )}
                                    </div>
                                    <h2 className="fw-semibold text-primary mb-1">Student Profile</h2>
                                    <p className="text-muted mb-0">View and manage your personal information</p>
                                </div>

                                <div className="mb-4">
                                    <h3 className="h5 fw-semibold text-secondary mb-4 pb-2 border-bottom">
                                        <i className="bi bi-info-circle me-2"></i>Personal Details
                                    </h3>
                                    
                                    <div className="row g-4">
                                        <div className="col-md-6">
                                            <div className="p-3 bg-light rounded-3">
                                                <small className="text-muted d-block mb-1">Name</small>
                                                {/* ✅ Check if your backend sends 'studentName' or 'studentname' */}
                                                <strong className="text-dark">{student.studentname || student.studentName}</strong>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="p-3 bg-light rounded-3">
                                                <small className="text-muted d-block mb-1">Admission No</small>
                                                <strong className="text-dark">{student.admissionNo}</strong>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="p-3 bg-light rounded-3">
                                                <small className="text-muted d-block mb-1">Course</small>
                                                <strong className="text-dark">{student.course}</strong>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="p-3 bg-light rounded-3">
                                                <small className="text-muted d-block mb-1">Branch</small>
                                                <strong className="text-dark">{student.branch}</strong>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="p-3 bg-light rounded-3">
                                                <small className="text-muted d-block mb-1">Session</small>
                                                <strong className="text-dark">{student.session}</strong>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="p-3 bg-light rounded-3">
                                                <small className="text-muted d-block mb-1">Email</small>
                                                <strong className="text-dark text-break">{student.email}</strong>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="p-3 bg-light rounded-3">
                                                <small className="text-muted d-block mb-1">Mobile</small>
                                                <strong className="text-dark">{student.mobile}</strong>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="p-3 bg-light rounded-3">
                                                <small className="text-muted d-block mb-1">Date of Birth</small>
                                                <strong className="text-dark">
                                                    {student.dob || <span className="text-warning fst-italic">Not Updated</span>}
                                                </strong>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="p-3 bg-light rounded-3">
                                                <small className="text-muted d-block mb-1">Gender</small>
                                                <strong className="text-dark">
                                                    {student.gender || <span className="text-warning fst-italic">Not Updated</span>}
                                                </strong>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="p-3 bg-light rounded-3">
                                                <small className="text-muted d-block mb-1">Father's Name</small>
                                                <strong className="text-dark">
                                                    {student.fatherName || <span className="text-warning fst-italic">Not Updated</span>}
                                                </strong>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="p-3 bg-light rounded-3">
                                                <small className="text-muted d-block mb-1">Father's Mobile</small>
                                                <strong className="text-dark">
                                                    {student.fatherMobile || <span className="text-warning fst-italic">Not Updated</span>}
                                                </strong>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="p-3 bg-light rounded-3">
                                                <small className="text-muted d-block mb-1">Mother's Name</small>
                                                <strong className="text-dark">
                                                    {student.motherName || <span className="text-warning fst-italic">Not Updated</span>}
                                                </strong>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="p-3 bg-light rounded-3">
                                                <small className="text-muted d-block mb-1">Address</small>
                                                <strong className="text-dark">{student.address}</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-grid gap-2 mt-4 pt-3 border-top">
                                    <button 
                                        className="btn btn-primary btn-lg fw-semibold transition-all"
                                        // ✅ Pass 'student' object, not 'profile'
                                        onClick={() => navigate('/update-student-profile', { state: { profile: student } })}
                                        style={{transition: 'all 0.3s ease'}}
                                    >
                                        <i className="bi bi-pencil-square me-2"></i>Update Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentProfile;
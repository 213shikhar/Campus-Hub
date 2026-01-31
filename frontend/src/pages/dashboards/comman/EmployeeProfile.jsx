import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmployeeProfile = () => {

    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // IMPORTANT: Ensure you save 'eid' in localStorage during Employee Login!
    const eid = localStorage.getItem('eid'); 

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/employees/profile/${eid}`);
                setProfile(response.data);
            } catch (error) {
                console.error("Error fetching profile", error);
            } finally {
                setLoading(false);
            }
        };

        if (eid) {
            fetchProfile();
        } else {
            setLoading(false);
        }
    }, [eid]);

    if (loading) return <div>Loading Profile...</div>;
    if (!profile) return <div>No profile data found.</div>;

    return(
        <div className="min-vh-100 d-flex flex-column bg-light py-5">
    <div className="container flex-grow-1">
        <div className="row justify-content-center">
            <div className="col-12 col-sm-11 col-md-10 col-lg-9 col-xl-8 px-3 px-sm-4">
                {/* Back Button */}
                <button 
                    className="btn btn-outline-secondary mb-3 transition-all" 
                    onClick={() => navigate(-1)}
                    style={{transition: 'all 0.3s ease'}}
                >
                    <i className="bi bi-arrow-left me-2"></i>Back
                </button>

                {/* Profile Card */}
                <div className="card shadow-lg border-0 rounded-4">
                    <div className="card-body p-4 p-md-5">
                        {/* Header */}
                        <div className="text-center mb-4">
                            <div className="mb-3">
                                <i className="bi bi-person-circle fs-1 text-primary"></i>
                            </div>
                            <h2 className="fw-semibold text-primary mb-1">Employee Profile</h2>
                            <p className="text-muted mb-0">View and manage your professional information</p>
                        </div>

                        {/* Official Details Section */}
                        <div className="mb-5">
                            <h3 className="h5 fw-semibold text-secondary mb-4 pb-2 border-bottom">
                                <i className="bi bi-briefcase me-2"></i>Official Details
                            </h3>
                            
                            <div className="row g-4">
                                {/* Name */}
                                <div className="col-md-6">
                                    <div className="p-3 bg-light rounded-3">
                                        <small className="text-muted d-block mb-1">Name</small>
                                        <strong className="text-dark">{profile.employeeName}</strong>
                                    </div>
                                </div>

                                {/* Employee ID */}
                                <div className="col-md-6">
                                    <div className="p-3 bg-light rounded-3">
                                        <small className="text-muted d-block mb-1">Employee ID</small>
                                        <strong className="text-dark">{profile.eid}</strong>
                                    </div>
                                </div>

                                {/* Role */}
                                <div className="col-md-6">
                                    <div className="p-3 bg-light rounded-3">
                                        <small className="text-muted d-block mb-1">Role</small>
                                        <strong className="text-dark text-capitalize">{profile.type}</strong>
                                    </div>
                                </div>

                                {/* Department */}
                                <div className="col-md-6">
                                    <div className="p-3 bg-light rounded-3">
                                        <small className="text-muted d-block mb-1">Department</small>
                                        <strong className="text-dark">{profile.department}</strong>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="col-md-6">
                                    <div className="p-3 bg-light rounded-3">
                                        <small className="text-muted d-block mb-1">Email</small>
                                        <strong className="text-dark text-break">{profile.email}</strong>
                                    </div>
                                </div>

                                {/* Mobile */}
                                <div className="col-md-6">
                                    <div className="p-3 bg-light rounded-3">
                                        <small className="text-muted d-block mb-1">Mobile</small>
                                        <strong className="text-dark">{profile.mobile}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Personal & Professional Details Section */}
                        <div className="mb-4">
                            <h3 className="h5 fw-semibold text-secondary mb-4 pb-2 border-bottom">
                                <i className="bi bi-person-badge me-2"></i>Personal & Professional Details
                            </h3>
                            
                            <div className="row g-4">
                                {/* Qualification */}
                                <div className="col-md-6">
                                    <div className="p-3 bg-light rounded-3">
                                        <small className="text-muted d-block mb-1">Qualification</small>
                                        <strong className="text-dark">
                                            {profile.qualification || <span className="text-warning fst-italic">Not Updated</span>}
                                        </strong>
                                    </div>
                                </div>

                                {/* Experience */}
                                <div className="col-md-6">
                                    <div className="p-3 bg-light rounded-3">
                                        <small className="text-muted d-block mb-1">Experience</small>
                                        <strong className="text-dark">
                                            {profile.experience || <span className="text-warning fst-italic">Not Updated</span>}
                                        </strong>
                                    </div>
                                </div>

                                {/* Date of Birth */}
                                <div className="col-md-6">
                                    <div className="p-3 bg-light rounded-3">
                                        <small className="text-muted d-block mb-1">Date of Birth</small>
                                        <strong className="text-dark">
                                            {profile.dob || <span className="text-warning fst-italic">Not Updated</span>}
                                        </strong>
                                    </div>
                                </div>

                                {/* Gender */}
                                <div className="col-md-6">
                                    <div className="p-3 bg-light rounded-3">
                                        <small className="text-muted d-block mb-1">Gender</small>
                                        <strong className="text-dark">
                                            {profile.gender || <span className="text-warning fst-italic">Not Updated</span>}
                                        </strong>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="col-md-6">
                                    <div className="p-3 bg-light rounded-3">
                                        <small className="text-muted d-block mb-1">Address</small>
                                        <strong className="text-dark">
                                            {profile.address || <span className="text-warning fst-italic">Not Updated</span>}
                                        </strong>
                                    </div>
                                </div>

                                {/* PAN Card */}
                                <div className="col-md-6">
                                    <div className="p-3 bg-light rounded-3">
                                        <small className="text-muted d-block mb-1">PAN Card</small>
                                        <strong className="text-dark">
                                            {profile.panCardNo || <span className="text-warning fst-italic">Not Updated</span>}
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="d-grid gap-2 mt-4 pt-3 border-top">
                            <button 
                                className="btn btn-primary btn-lg fw-semibold transition-all"
                                onClick={() => navigate('/update-employee-profile', { state: { profile } })}
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
};

export default EmployeeProfile;
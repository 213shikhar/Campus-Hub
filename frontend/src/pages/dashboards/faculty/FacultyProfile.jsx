import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FacultyProfile = () => {
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

    return (
        <div className="profile-container">
            <h2>Employee Profile</h2>
            
            <div className="profile-section">
                <h3>Official Details</h3>
                <div className="details-grid">
                    <div className="detail-item"><strong>Name:</strong> {profile.employeeName}</div>
                    <div className="detail-item"><strong>Employee ID:</strong> {profile.eid}</div>
                    <div className="detail-item"><strong>Role:</strong> {profile.type}</div>
                    <div className="detail-item"><strong>Department:</strong> {profile.department}</div>
                    <div className="detail-item"><strong>Email:</strong> {profile.email}</div>
                    <div className="detail-item"><strong>Mobile:</strong> {profile.mobile}</div>
                </div>
            </div>

            <div className="profile-section">
                <h3>Personal & Professional Details</h3>
                <div className="details-grid">
                    <div className="detail-item"><strong>Qualification:</strong> {profile.qualification || "Not Updated"}</div>
                    <div className="detail-item"><strong>Experience:</strong> {profile.experience || "Not Updated"}</div>
                    <div className="detail-item"><strong>Date of Birth:</strong> {profile.dob || "Not Updated"}</div>
                    {/* <div className="detail-item"><strong>Gender:</strong> {profile.gender || "Not Updated"}</div> */}
                    <div className="detail-item"><strong>Address:</strong> {profile.address || "Not Updated"}</div>
                    <div className="detail-item"><strong>PAN Card:</strong> {profile.panCardNo || "Not Updated"}</div>
                </div>
            </div>

            <div className="profile-actions">
                <button 
                    className="update-btn" 
                    onClick={() => navigate('/update-employee-profile', { state: { profile } })}
                >
                    Update Profile
                </button><br/>
                <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
            </div>
        </div>
    );
};

export default FacultyProfile;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../DashboardStyling.css';

const StudentProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Assuming you store the logged-in user's admission number in localStorage
    const admissionNo = localStorage.getItem('admissionNo'); 

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Make sure this URL matches your Controller
                const response = await axios.get(`http://localhost:8080/api/students/profile/${admissionNo}`);
                setProfile(response.data);
            } catch (error) {
                console.error("Error fetching profile", error);
            } finally {
                setLoading(false); // Stop loading whether it works or fails
            }
        };

        if (admissionNo) {
            fetchProfile();
        } else {
            // FIX: If no admissionNo, stop loading immediately
            console.log("No admission number found in Local Storage");
            setLoading(false);
        }
    }, [admissionNo]);

    if (loading) return <div>Loading Profile...</div>;
    if (!profile) return <div>No profile data found.</div>;

    return (
        <div className="profile-container">
            <h2>Student Profile</h2>
            
            <div className="profile-section">
                <h3>Personal Details</h3>
                <div className="details-grid">
                    <div className="detail-item"><strong>Name:</strong> {profile.studentName}</div>
                    <div className="detail-item"><strong>Admission No:</strong> {profile.admissionNo}</div>
                    <div className="detail-item"><strong>Course:</strong> {profile.course}</div>
                    <div className="detail-item"><strong>Branch:</strong> {profile.branch}</div>
                    <div className="detail-item"><strong>Session:</strong> {profile.session}</div>
                    <div className="detail-item"><strong>Email:</strong> {profile.email}</div>
                    <div className="detail-item"><strong>Mobile:</strong> {profile.mobile}</div>
                    <div className="detail-item"><strong>Date of Birth:</strong> {profile.dob || <span className="empty-field">Not Updated</span>}</div>
                    <div className="detail-item"><strong>Gender:</strong> {profile.gender || <span className="empty-field">Not Updated</span>}</div>
                    <div className="detail-item"><strong>Father's Name:</strong> {profile.fatherName || <span className="empty-field">Not Updated</span>}</div>
                    <div className="detail-item"><strong>Father's Mobile:</strong> {profile.fatherMobile || <span className="empty-field">Not Updated</span>}</div>
                    <div className="detail-item"><strong>Mother's Name:</strong> {profile.motherName || <span className="empty-field">Not Updated</span>}</div>
                    <div className="detail-item"><strong>Mother's Mobile:</strong> {profile.motherMobile || <span className="empty-field">Not Updated</span>}</div>

                    <div className="detail-item"><strong>Address:</strong> {profile.address}</div>
                </div>
            </div>

            <div className="profile-actions">
                <button 
                    className="update-btn" 
                    onClick={() => navigate('/update-student-profile', { state: { profile } })}
                >
                    Update Profile
                </button><br/><br/>
                <button className="back-btn" onClick={() => navigate(-1)}>Back</button>

            </div>
        </div>
    );
}
export default StudentProfile;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FacultySchedule = () => {
    const navigate = useNavigate();
    const [timetable, setTimetable] = useState([]);
    const [loading, setLoading] = useState(true);
    const [facultyName, setFacultyName] = useState('');

    // Fixed Slots
    const timeSlots = ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00", "04:00-05:00"];
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    useEffect(() => {
        const fetchMySchedule = async () => {
            try {
                // 1. Get Logged-in Faculty ID
                const eid = localStorage.getItem('eid');
                if (!eid) {
                    alert("Please login first");
                    navigate('/');
                    return;
                }

                // 2. Fetch Faculty Name (Optional, for Header)
                try {
                    const profileRes = await axios.get(`http://localhost:8080/api/employees/profile/${eid}`);
                    setFacultyName(profileRes.data.employeeName);
                } catch (e) { console.warn("Could not fetch name"); }

                // 3. Fetch Schedule
                const res = await axios.get(`http://localhost:8080/api/timetable/faculty/${eid}`);
                setTimetable(res.data);
                setLoading(false);

            } catch (error) {
                console.error("Error fetching schedule:", error);
                setLoading(false);
            }
        };

        fetchMySchedule();
    }, [navigate]);

    const getEntry = (day, time) => {
        return timetable.find(t => t.dayOfWeek === day && t.timeSlot === time);
    };

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div><p>Loading Schedule...</p></div>;

    return (
        <div className="container mt-4">
            
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold text-primary mb-0">My Teaching Schedule</h2>
                    <p className="text-muted mb-0">Welcome, {facultyName || "Faculty"}</p>
                </div>
                <button className="btn btn-outline-secondary btn-sm" onClick={() => window.print()}>
                    <i className="bi bi-printer me-2"></i>Print
                </button>
            </div>
            <button 
                    className="btn btn-outline-secondary mb-3 transition-all" 
                    onClick={() => navigate(-1)}
                    style={{transition: 'all 0.3s ease'}}
                >
                    <i className="bi bi-arrow-left me-2"></i>Back
                </button>

            {/* Timetable Grid */}
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                <div className="table-responsive">
                    <table className="table table-bordered text-center align-middle mb-0">
                        <thead className="bg-primary text-white">
                            <tr>
                                <th className="py-3" style={{width: '120px'}}>Day / Time</th>
                                {timeSlots.map(slot => (
                                    <th key={slot} className="py-3 text-nowrap">{slot}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {days.map(day => (
                                <tr key={day}>
                                    <td className="fw-bold bg-light text-primary">{day}</td>
                                    
                                    {timeSlots.map(slot => {
                                        const entry = getEntry(day, slot);
                                        return (
                                            <td key={slot} className="p-0" style={{height: '100px', minWidth: '160px'}}>
                                                {entry ? (
                                                    <div className="h-100 w-100 p-2 d-flex flex-column justify-content-center bg-success bg-opacity-10 border-start border-3 border-success">
                                                        {/* Subject */}
                                                        <div className="fw-bold text-dark small">{entry.subjectName}</div>
                                                        
                                                        {/* Target Class (The Key Info for Faculty) */}
                                                        <div className="badge bg-primary mt-1 text-wrap py-1">
                                                            {entry.course} - {entry.branch} ({entry.semester}-{entry.section})
                                                        </div>

                                                        {/* Room No */}
                                                        {entry.roomNo && (
                                                            <div className="small text-muted mt-1 fw-bold">
                                                                <i className="bi bi-geo-alt me-1"></i>{entry.roomNo}
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="h-100 w-100 bg-light opacity-25"></div>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FacultySchedule;
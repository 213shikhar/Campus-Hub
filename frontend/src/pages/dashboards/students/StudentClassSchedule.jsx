import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentClassSchedule = () => {
    const navigate = useNavigate();
    const [timetable, setTimetable] = useState([]);
    const [studentInfo, setStudentInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fixed Slots (Must match what HOD used)
    const timeSlots = ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00", "04:00-05:00"];
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                // 1. Get Admission Number
                const admissionNo = localStorage.getItem('admissionNo');
                if (!admissionNo) {
                    alert("Please login first");
                    navigate('/');
                    return;
                }

                // 2. Fetch Student Profile (To get Course/Branch/Sem/Sec)
                const profileRes = await axios.get(`http://localhost:8080/api/students/profile/${admissionNo}`);
                const student = profileRes.data;
                setStudentInfo(student);

                console.log("Student Found:", student);

                // 3. Fetch Timetable using Student's Details
                // Ensure query params match the Backend API exactly
                const scheduleRes = await axios.get('http://localhost:8080/api/timetable/student', {
                    params: {
                        course: student.course,
                        branch: student.branch,
                        semester: student.semester,
                        section: student.section
                    }
                });
                
                setTimetable(scheduleRes.data);
                setLoading(false);

            } catch (err) {
                console.error("Error loading schedule:", err);
                setError("Could not load timetable. Please try again later.");
                setLoading(false);
            }
        };

        fetchSchedule();
    }, [navigate]);

    // Helper to find entry for a specific cell
    const getEntry = (day, time) => {
        return timetable.find(t => t.dayOfWeek === day && t.timeSlot === time);
    };

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div><p>Loading Schedule...</p></div>;
    if (error) return <div className="text-center mt-5 text-danger fw-bold">{error}</div>;

    return (
        <div className="container mt-4">
            
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold text-primary mb-0">My Class Schedule</h2>
                
                {/* Display Student Context */}
                {studentInfo && (
                    <div className="badge bg-secondary p-2 fs-6">
                        {studentInfo.course} | {studentInfo.branch} | Sem {studentInfo.semester} ({studentInfo.section})
                    </div>
                )}
            </div>

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
                                    {/* Day Column */}
                                    <td className="fw-bold bg-light text-primary">{day}</td>
                                    
                                    {/* Time Slot Columns */}
                                    {timeSlots.map(slot => {
                                        const entry = getEntry(day, slot);
                                        return (
                                            <td key={slot} className="p-0 position-relative" style={{height: '100px', minWidth: '150px'}}>
                                                {entry ? (
                                                    <div className="h-100 w-100 p-2 d-flex flex-column justify-content-center bg-info bg-opacity-10 border-start border-3 border-info">
                                                        {/* Subject */}
                                                        <div className="fw-bold text-dark">{entry.subjectName}</div>
                                                        
                                                        {/* Faculty */}
                                                        <div className="small text-muted fst-italic mt-1">
                                                            <i className="bi bi-person me-1"></i>{entry.facultyName}
                                                        </div>

                                                        {/* Room No (if exists) */}
                                                        {entry.roomNo && (
                                                            <div className="badge bg-white text-dark border mt-1 align-self-center shadow-sm">
                                                                Room: {entry.roomNo}
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    // Empty Slot
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

            {/* Footer Legend */}
            <div className="mt-3 text-muted small text-end">
                <i className="bi bi-info-circle me-1"></i>
                Schedule is managed by HOD. Contact department for discrepancies.
            </div>
        </div>
    );
};

export default StudentClassSchedule;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentExamSchedule = () => {
    const navigate = useNavigate();
    
    const [schedule, setSchedule] = useState([]);
    const [studentInfo, setStudentInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    // 1. First Effect: Load Student Profile ONLY
    useEffect(() => {
        const admissionNo = localStorage.getItem("admissionNo");
        
        if (admissionNo) {
            axios.get(`http://localhost:8080/api/students/profile/${admissionNo}`)
                .then(res => {
                    console.log("Student Data Loaded:", res.data); 
                    setStudentInfo(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Error fetching profile", err);
                    alert("Could not load profile. Please login again.");
                    navigate('/');
                });
        } else {
            alert("Please login first");
            navigate('/');
        }
    }, [navigate]);

    // 2. Second Effect: Load Schedule ONLY when studentInfo is ready and valid
    useEffect(() => {
        // ✅ CRITICAL FIX: Check if all required fields exist before calling API
        if (studentInfo && studentInfo.course && studentInfo.branch && studentInfo.semester) {
            
            console.log("Fetching Schedule for:", studentInfo.course, studentInfo.branch, studentInfo.semester);
            
            axios.get('http://localhost:8080/api/exam/schedule/view', {
                params: {
                    course: studentInfo.course,
                    branch: studentInfo.branch,
                    semester: studentInfo.semester 
                }
            })
            .then(res => setSchedule(res.data))
            .catch(err => {
                console.error("Schedule Error:", err);
                // Optional: handle specific 400 errors if needed
            });
        }
    }, [studentInfo]); // dependency on studentInfo

    // Helper to format Time (e.g., 10:00:00 -> 10:00 AM)
    const formatTime = (timeString) => {
        if(!timeString) return "";
        const [hour, minute] = timeString.split(':');
        const h = parseInt(hour, 10);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const formattedHour = h % 12 || 12;
        return `${formattedHour}:${minute} ${ampm}`;
    };

    if (loading) return <div style={{padding:'20px', textAlign:'center'}}>Loading Profile...</div>;
    if (!studentInfo) return null;

    return (
        <div style={{maxWidth: '900px', margin: '30px auto', padding: '20px', fontFamily: 'Arial, sans-serif'}}>
            
            {/* Header Section */}
            <div style={{textAlign: 'center', marginBottom: '30px'}}>
                <h2 style={{margin: '0', color: '#333'}}>Exam Schedule</h2>
                <p style={{color: '#666', marginTop: '5px'}}>
                    {studentInfo.course} | {studentInfo.branch} | Semester {studentInfo.semester}
                </p>
                
                {/* Standard Time Display (Optional) */}
                {schedule.length > 0 && schedule[0].startTime && (
                    <div style={{marginTop: '10px', padding: '8px 15px', backgroundColor: '#e9ecef', display: 'inline-block', borderRadius: '5px', fontSize: '0.9em'}}>
                        <strong>Standard Time: </strong> 
                        {formatTime(schedule[0].startTime)} - {formatTime(schedule[0].endTime)}
                    </div>
                )}
            </div>

            {/* Schedule Table */}
            {schedule.length === 0 ? (
                <div style={{textAlign:'center', padding: '40px', backgroundColor: '#f9f9f9', borderRadius: '8px'}}>
                    <p style={{fontStyle:'italic', color: '#666'}}>No exams scheduled for this semester yet.</p>
                </div>
            ) : (
                <table border="1" cellPadding="15" style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
                    <thead>
                        <tr style={{backgroundColor: '#007bff', color: 'white'}}>
                            <th style={{width: '20%'}}>Date</th>
                            <th style={{width: '15%'}}>Day</th>
                            <th style={{width: '40%'}}>Subject</th>
                            <th style={{width: '25%'}}>Time Slot</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedule.map((exam) => {
                            const dateObj = new Date(exam.examDate);
                            const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });

                            return (
                                <tr key={exam.id} style={{borderBottom: '1px solid #ddd'}}>
                                    <td style={{fontWeight: 'bold', color: '#555'}}>
                                        {exam.examDate}
                                    </td>
                                    <td>{dayName}</td>
                                    <td>
                                        <div style={{fontWeight: 'bold', fontSize: '1.1em'}}>{exam.subjectName}</div>
                                        <div style={{fontSize: '0.85em', color: '#888'}}>Code: {exam.subjectCode}</div>
                                    </td>
                                    <td>
                                        {formatTime(exam.startTime)} - {formatTime(exam.endTime)}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
            
            <div style={{marginTop: '30px', textAlign: 'center'}}>
                <button 
                    onClick={() => navigate(-1)} 
                    style={{
                        padding: '10px 25px', 
                        cursor: 'pointer', 
                        backgroundColor: '#6c757d', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '5px',
                        fontSize: '1rem'
                    }}
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default StudentExamSchedule;
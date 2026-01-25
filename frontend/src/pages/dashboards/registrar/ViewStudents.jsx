import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../DashboardStyling.css'; // Ensure CSS is imported for table styles

const ViewStudents = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchStudents = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/registrar/students');
            setStudents(res.data);
        } catch (err) { console.error(err); } 
        finally { setLoading(false); }
    };

    useEffect(() => { fetchStudents(); }, []);

    // Feature: Update Semester
    const handlePromote = async (admissionNo, currentSem) => {
        if(window.confirm(`Promote student ${admissionNo} to Semester ${currentSem + 1}?`)) {
            try {
                await axios.put(`http://localhost:8080/api/registrar/promote/${admissionNo}`);
                alert("Student Promoted!");
                fetchStudents(); // Refresh data
            } catch (err) { alert("Failed to promote."); }
        }
    };

    // Feature: Modify Student (Reuses your existing UpdateStudentForm)
    const handleEdit = async (admissionNo) => {
        // We need to fetch the full profile first to pass it to the form
        try {
            const res = await axios.get(`http://localhost:8080/api/students/profile/${admissionNo}`);
            navigate('/update-student-profile', { state: { profile: res.data } });
        } catch (error) { alert("Could not fetch full profile for editing."); }
    };

    if (loading) return <div>Loading Data...</div>;

    return (
        <div className="table-container" style={{padding: '20px'}}>
            <h2>Student Management</h2>
            <button className="back-btn" onClick={() => navigate(-1)}>Back to Dashboard</button>
            
            <table border="1" cellPadding="10" style={{width: '100%', borderCollapse: 'collapse', marginTop: '20px'}}>
                <thead>
                    <tr style={{backgroundColor: '#f2f2f2'}}>
                        <th>Admission No</th>
                        <th>Name</th>
                        <th>Course</th>
                        <th>Branch</th>
                        <th>Current Sem</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.admissionNo}>
                            <td>{student.admissionNo}</td>
                            <td>{student.studentname}</td>
                            <td>{student.course}</td>
                            <td>{student.branch}</td>
                            <td><strong>{student.semester}</strong></td>
                            <td>
                                <button 
                                    onClick={() => handlePromote(student.admissionNo, student.semester)}
                                    style={{marginRight: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer'}}
                                >
                                    Promote Sem
                                </button>
                                <button 
                                    onClick={() => handleEdit(student.admissionNo)}
                                    style={{backgroundColor: '#007bff', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer'}}
                                >
                                    Edit Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewStudents;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewStudents = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    
    // Filter States
    const [courses, setCourses] = useState([]);
    const [branches, setBranches] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');

    // 1. Fetch Dropdown Options on Load
    useEffect(() => {
        axios.get('http://localhost:8080/api/registrar/courses')
            .then(res => setCourses(res.data))
            .catch(err => console.error("Error loading courses", err));
            
        axios.get('http://localhost:8080/api/registrar/departments')
            .then(res => setBranches(res.data))
            .catch(err => console.error("Error loading branches", err));
    }, []);

    // 2. Fetch Students (With or Without Filters)
    const fetchStudents = async () => {
        try {
            let url = 'http://localhost:8080/api/registrar/students';
            
            // Build query params dynamically
            const params = new URLSearchParams();
            if (selectedCourse) params.append('course', selectedCourse);
            if (selectedBranch) params.append('branch', selectedBranch);

            // If params exist, append them to URL
            if (params.toString()) {
                url += `?${params.toString()}`;
            }

            const res = await axios.get(url);
            setStudents(res.data);
        } catch (err) { console.error(err); }
    };

    // Trigger fetch when filters change
    useEffect(() => {
        fetchStudents(); 
    }, [selectedCourse, selectedBranch]);

    // 3. Delete Functionality
    const handleDelete = async (admissionNo) => {
        if(window.confirm(`Are you sure you want to delete student ${admissionNo}? This cannot be undone.`)) {
            try {
                await axios.delete(`http://localhost:8080/api/registrar/student/delete/${admissionNo}`);
                alert("Student Deleted");
                fetchStudents(); // Refresh list
            } catch (err) { alert("Failed to delete."); }
        }
    };

    // 4. Feature: Update Semester
    const handlePromote = async (admissionNo, currentSem) => {
        if(window.confirm(`Promote student ${admissionNo} to Semester ${currentSem + 1}?`)) {
            try {
                await axios.put(`http://localhost:8080/api/registrar/promote/${admissionNo}`);
                alert("Student Promoted!");
                fetchStudents(); // Refresh data
            } catch (err) { alert("Failed to promote."); }
        }
    };

    // 5. Feature: Modify Student
    const handleEdit = async (admissionNo) => {
        try {
            const res = await axios.get(`http://localhost:8080/api/students/profile/${admissionNo}`);
            navigate('/update-student-profile', { state: { profile: res.data } });
        } catch (error) { alert("Could not fetch full profile for editing."); }
    };

    return (
        <div className="table-container" style={{padding: '20px'}}>
            <h2>Student Management</h2>
            <button className="back-btn" onClick={() => navigate(-1)} style={{marginBottom: '15px', padding: '8px 15px', cursor: 'pointer'}}>
                &larr; Back to Dashboard
            </button>
            
            {/* --- FILTER SECTION --- */}
            <div className="filter-bar" style={{marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px', border: '1px solid #ddd'}}>
                <label style={{marginRight: '10px', fontWeight: 'bold'}}>Filter By:</label>
                
                <select onChange={(e) => setSelectedCourse(e.target.value)} value={selectedCourse} style={{padding: '5px', marginRight: '10px'}}>
                    <option value="">-- All Courses --</option>
                    {courses.map(c => <option key={c.id} value={c.courseName}>{c.courseName}</option>)}
                </select>

                <select onChange={(e) => setSelectedBranch(e.target.value)} value={selectedBranch} style={{padding: '5px', marginRight: '10px'}}>
                    <option value="">-- All Branches --</option>
                    {branches.map(b => <option key={b.id} value={b.deptName}>{b.deptName}</option>)}
                </select>

                <button onClick={fetchStudents} style={{padding: '5px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
                    Refresh List
                </button>
            </div>

            {/* --- TABLE SECTION --- */}
            {students.length === 0 ? (
                <p>No students found matching the criteria.</p>
            ) : (
                <table border="1" cellPadding="10" style={{width: '100%', borderCollapse: 'collapse'}}>
                    <thead>
                        <tr style={{backgroundColor: '#f2f2f2'}}>
                            <th>Admission No</th>
                            <th>Name</th>
                            <th>Course</th>
                            <th>Branch</th>
                            <th>Current Sem</th> {/* Added Column */}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(s => (
                            <tr key={s.admissionNo}>
                                <td>{s.admissionNo}</td>
                                <td>{s.studentname}</td>
                                <td>{s.course.toUpperCase()}</td>
                                <td>{s.branch.toUpperCase()}</td>
                                <td style={{textAlign: 'center', fontWeight: 'bold'}}>{s.semester}</td>
                                <td style={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
                                    
                                    {/* PROMOTE BUTTON */}
                                    <button 
                                        onClick={() => handlePromote(s.admissionNo, s.semester)}
                                        style={{backgroundColor: '#28a745', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '3px'}}
                                        title="Promote to next semester"
                                    >
                                        &#8679; Promote
                                    </button>

                                    {/* EDIT BUTTON */}
                                    <button 
                                        onClick={() => handleEdit(s.admissionNo)} 
                                        style={{backgroundColor: '#007bff', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '3px'}}
                                    >
                                        Edit
                                    </button>
                                    
                                    {/* DELETE BUTTON */}
                                    <button 
                                        onClick={() => handleDelete(s.admissionNo)} 
                                        style={{backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '3px'}}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ViewStudents;
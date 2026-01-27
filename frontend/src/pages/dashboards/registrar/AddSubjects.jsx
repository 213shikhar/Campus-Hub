import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddSubjectStyling.css'; // ✅ Import the new separate CSS file

const AddSubjects = () => {
    const navigate = useNavigate();
    
    // Form State
    const [formData, setFormData] = useState({ 
        subjectName: '', subjectCode: '', semester: '', courseName: '', branchName: '' 
    });
    
    // Data States
    const [courses, setCourses] = useState([]);
    const [depts, setDepts] = useState([]); 
    const [subjects, setSubjects] = useState([]);
    const [message, setMessage] = useState('');

    const fetchSubjects = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/registrar/subjects');
            // Sort by Semester, then Subject Code
            const sorted = res.data.sort((a, b) => a.semester - b.semester || a.subjectCode.localeCompare(b.subjectCode)); 
            setSubjects(sorted);
        } catch (err) {
            console.error("Error fetching subjects", err);
        }
    };

    useEffect(() => {
        axios.get('http://localhost:8080/api/registrar/courses').then(res => setCourses(res.data));
        axios.get('http://localhost:8080/api/registrar/departments').then(res => setDepts(res.data));
        fetchSubjects();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/registrar/subject/add', formData);
            setMessage('Subject Added Successfully!');
            setFormData({ subjectName: '', subjectCode: '', semester: '', courseName: '', branchName: '' });
            fetchSubjects(); 
        } catch (error) { 
            setMessage('Error adding subject.'); 
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleDelete = async (id) => {
        // Confirmation Dialog
        if (window.confirm("Are you sure you want to delete this subject?")) {
            try {
                await axios.delete(`http://localhost:8080/api/registrar/subject/delete/${id}`);
                // Success feedback
                alert("Subject Deleted Successfully");
                // Refresh the list
                fetchSubjects(); 
            } catch (error) {
                console.error("Error deleting subject:", error);
                alert("Failed to delete subject.");
            }
        }
    };

    return (
        <div className="add-subject-container">
            <div style={{textAlign: 'center'}}>
                <h2>Add Subjects</h2>
            </div>
            
            {message && <p className="success-msg">{message}</p>}
            
            <form onSubmit={handleSubmit} className="add-subject-form">
                
                <div className="form-grid">
                    <div className="input-group">
                        <label>Subject Name</label>
                        <input 
                            type="text" 
                            name="subjectName" 
                            className="form-input" 
                            placeholder="e.g. Data Structures"
                            value={formData.subjectName} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    
                    <div className="input-group">
                        <label>Subject Code</label>
                        <input 
                            type="text" 
                            name="subjectCode" 
                            className="form-input" 
                            placeholder="e.g. CS102"
                            value={formData.subjectCode} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="input-group">
                        <label>Semester</label>
                        <input 
                            type="number" 
                            name="semester" 
                            className="form-input" 
                            value={formData.semester} 
                            onChange={handleChange} 
                            required 
                            min="1" 
                            max="8"
                        />
                    </div>

                    <div className="input-group">
                        <label>Course</label>
                        <select 
                            name="courseName" 
                            className="form-input" 
                            value={formData.courseName} 
                            onChange={handleChange} 
                            required
                        >
                            <option value="">-- Select Course --</option>
                            {courses.map(c => (
                                <option key={c.id} value={c.courseName}>{c.courseName}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="input-group">
                    <label>Branch / Department</label>
                    <select 
                        name="branchName" 
                        className="form-input" 
                        value={formData.branchName} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="">-- Select Branch --</option>
                        {depts.map(d => (
                            <option key={d.id} value={d.deptName}>{d.deptName}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="submit-btn">Add Subject</button>
            </form>

            <div className="table-section">
                <h3>Existing Subjects</h3>

                {subjects.length === 0 ? <p>No subjects found.</p> : (
                    <table className="subjects-table">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Subject Name</th>
                                <th>Sem</th>
                                <th>Course</th>
                                <th>Branch</th>
                                <th>Action</th> {/* ✅ Added Action Column */}
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.map(sub => (
                                <tr key={sub.id}>
                                    <td><strong>{sub.subjectCode}</strong></td>
                                    <td>{sub.subjectName}</td>
                                    <td>{sub.semester}</td>
                                    <td>{sub.courseName}</td>
                                    <td>{sub.branchName}</td>
                                    <td>
                                        {/* ✅ DELETE BUTTON */}
                                        <button 
                                            onClick={() => handleDelete(sub.id)}
                                            style={{
                                                backgroundColor: '#dc3545', 
                                                color: 'white', 
                                                border: 'none', 
                                                padding: '5px 10px', 
                                                borderRadius: '4px', 
                                                cursor: 'pointer',
                                                fontWeight: 'bold',
                                                fontSize: '0.85rem'
                                            }}
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

            <button className="back-btn" onClick={() => navigate(-1)}>Back to Dashboard</button>
        </div>
    );
};

export default AddSubjects;
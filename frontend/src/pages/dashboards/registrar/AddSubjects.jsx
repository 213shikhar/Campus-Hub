import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddSubjects = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ 
        subjectName: '', subjectCode: '', semester: '', courseName: '', branchName: '' 
    });
    const [courses, setCourses] = useState([]);
    const [depts, setDepts] = useState([]); // using depts as branches
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch dropdown options
        axios.get('http://localhost:8080/api/registrar/courses').then(res => setCourses(res.data));
        axios.get('http://localhost:8080/api/registrar/departments').then(res => setDepts(res.data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/registrar/subject/add', formData);
            setMessage('Subject Added Successfully!');
            setFormData({ subjectName: '', subjectCode: '', semester: '', courseName: '', branchName: '' });
        } catch (error) { setMessage('Error adding subject.'); }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="form-container">
            <h2>Add Subject</h2>
            {message && <p className="success-msg">{message}</p>}
            
            <form onSubmit={handleSubmit}>
                <label>Subject Name:</label>
                <input type="text" name="subjectName" value={formData.subjectName} onChange={handleChange} required />

                <label>Subject Code:</label>
                <input type="text" name="subjectCode" value={formData.subjectCode} onChange={handleChange} required />

                <label>Semester:</label>
                <input type="number" name="semester" value={formData.semester} onChange={handleChange} required min="1" max="8"/>

                <label>Course:</label>
                <select name="courseName" value={formData.courseName} onChange={handleChange} required>
                    <option value="">-- Select Course --</option>
                    {courses.map(c => <option key={c.id} value={c.courseName}>{c.courseName}</option>)}
                </select>

                <label>Branch/Dept:</label>
                <select name="branchName" value={formData.branchName} onChange={handleChange} required>
                    <option value="">-- Select Branch --</option>
                    {depts.map(d => <option key={d.id} value={d.deptName}>{d.deptName}</option>)}
                </select>

                <button type="submit">Add Subject</button>
            </form>
            <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
        </div>
    );
};

export default AddSubjects;
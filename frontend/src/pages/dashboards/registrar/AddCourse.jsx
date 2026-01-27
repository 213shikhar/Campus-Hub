import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegistrarStyling.css';


const AddCourse = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [formData, setFormData] = useState({ courseName: '', durationYears: '' });
    const [message, setMessage] = useState('');

    // Fetch existing courses to display them below the form
    const fetchCourses = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/registrar/courses');
            setCourses(res.data);
        } catch (err) { console.error(err); }
    };

    useEffect(() => { fetchCourses(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/registrar/course/add', formData);
            setMessage('Course Added Successfully!');
            setFormData({ courseName: '', durationYears: '' });
            fetchCourses(); // Refresh list
        } catch (error) {
            setMessage('Error adding course.');
        }
    };

    // Defined outside the component to prevent re-creation on every render
    const courseOptions = [
        "B. Sc", 
        "B. Tech", 
        "BCA", 
        "M. Sc", 
        "M. Tech", 
        "MCA"
    ];

    return (
        <div className="form-container-registrar">
            <h2>Manage Courses</h2>
            {message && <p className="success-msg">{message}</p>}
            
            <form onSubmit={handleSubmit}>
                <label>Course Name:</label>
                <select 
                    value={formData.courseName} 
                    onChange={e => setFormData({...formData, courseName: e.target.value})} 
                    required
                >
                    <option value="">-- Select Course --</option>
                    {courseOptions.map((course, index) => (
                        <option key={index} value={course}>
                            {course}
                        </option>
                    ))}
                </select>
                
                <label>Duration (Years):</label>
                <input 
                    type="number" 
                    value={formData.durationYears} 
                    onChange={e => setFormData({...formData, durationYears: e.target.value})} 
                    required 
                />

                <button type="submit">Add Course</button>
            </form>

            <h3>Existing Courses</h3>
            <ul>
                {courses.map(c => <li key={c.id}>{c.courseName.toUpperCase()} ({c.durationYears} Years)</li>)}
            </ul>
            <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
        </div>
    );
};

export default AddCourse;
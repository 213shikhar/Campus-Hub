import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegistrarStyling.css';

const AddDepartment = () => {
    const navigate = useNavigate();
    const [depts, setDepts] = useState([]);
    const [formData, setFormData] = useState({ deptName: '', deptCode: '' });
    const [message, setMessage] = useState('');

    const fetchDepts = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/registrar/departments');
            setDepts(res.data);
        } catch (err) { console.error(err); }
    };

    useEffect(() => { fetchDepts(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/registrar/dept/add', formData);
            setMessage('Department Added!');
            setFormData({ deptName: '', deptCode: '' });
            fetchDepts();
        } catch (error) { setMessage('Error adding department.'); }
    };

    const deptOptions = [
        "Artificial Intelligence & Machine Learning",
        "Biotechnology",
        "Chemistry",
        "Civil Engineering",
        "Cloud Computing",
        "Computer Applications",
        "Computer Science and Engineering",
        "Cyber Security",
        "Data Science",
        "Electrical Engineering",
        "Electronics and Communication Engineering",
        "Information Technology",
        "Mathematics",
        "Mechanical Engineering",
        "Mobile Application Development",
        "Physics",
        "Software Engineering",
        "Statistics",
        "Web Technologies"
    ];

    return (
        <div className="form-container-registrar">
            <h2>Manage Departments</h2>
            {message && <p className="success-msg">{message}</p>}
            
            <form onSubmit={handleSubmit}>
                <label>Department Name:</label>
                <select 
                    value={formData.deptName} 
                    onChange={e => setFormData({...formData, deptName: e.target.value})} 
                    required
                >
                    <option value="">-- Select Department --</option>
                    {deptOptions.map((dept, index) => (
                        <option key={index} value={dept}>
                            {dept}
                        </option>
                    ))}
                </select>
                <label>Dept Code: </label>
                <input 
                    type="text" 
                    value={formData.deptCode} 
                    onChange={e => setFormData({...formData, deptCode: e.target.value})} 
                    required 
                />
                <button type="submit">Add Department</button>
            </form>

            <h3>Existing Departments</h3>
            <ul>
                {depts.map(d => <li key={d.id}>{d.deptName.toUpperCase()} (Code: {d.deptCode})</li>)}
            </ul>
            <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
        </div>
    );
};

export default AddDepartment;
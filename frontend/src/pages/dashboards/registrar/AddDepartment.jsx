import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        <div className="min-vh-100 d-flex flex-column bg-light py-5">
    <div className="container flex-grow-1">
        <div className="row justify-content-center">
            <div className="col-12 col-sm-11 col-md-10 col-lg-8 col-xl-7 px-3 px-sm-4">
                {/* Back Button */}
                <button 
                    className="btn btn-outline-secondary mb-3 transition-all" 
                    onClick={() => navigate(-1)}
                    style={{transition: 'all 0.3s ease'}}
                >
                    <i className="bi bi-arrow-left me-2"></i>Back
                </button>

                {/* Add Department Form Card */}
                <div className="card shadow-lg border-0 rounded-4 mb-4">
                    <div className="card-body p-4 p-md-5">
                        <h2 className="text-center mb-4 fw-semibold text-primary">Add Departments</h2>
                        
                        {/* Success Message */}
                        {message && (
                            <div className="alert alert-success alert-dismissible fade show" role="alert">
                                <i className="bi bi-check-circle-fill me-2"></i>
                                {message}
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="deptName" className="form-label fw-medium">
                                    Department Name
                                </label>
                                <select 
                                    id="deptName"
                                    className="form-select form-select-lg transition-all"
                                    value={formData.deptName} 
                                    onChange={e => setFormData({...formData, deptName: e.target.value})} 
                                    required
                                    style={{transition: 'all 0.3s ease'}}
                                >
                                    <option value="">-- Select Department --</option>
                                    {deptOptions.map((dept, index) => (
                                        <option key={index} value={dept}>
                                            {dept}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="mb-4">
                                <label htmlFor="deptCode" className="form-label fw-medium">
                                    Department Code
                                </label>
                                <input 
                                    type="text"
                                    id="deptCode"
                                    className="form-control form-control-lg transition-all"
                                    value={formData.deptCode} 
                                    onChange={e => setFormData({...formData, deptCode: e.target.value})} 
                                    placeholder="Enter department code (e.g., CSE, ECE)"
                                    required
                                    style={{transition: 'all 0.3s ease'}}
                                />
                            </div>

                            <div className="d-grid">
                                <button 
                                    type="submit" 
                                    className="btn btn-primary btn-lg fw-semibold transition-all"
                                    style={{transition: 'all 0.3s ease'}}
                                >
                                    <i className="bi bi-plus-circle me-2"></i>Add Department
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Existing Departments Card */}
                <div className="card shadow-lg border-0 rounded-4">
                    <div className="card-body p-4 p-md-5">
                        <h3 className="mb-4 fw-semibold text-secondary">
                            <i className="bi bi-building me-2"></i>Existing Departments
                        </h3>
                        
                        {depts.length > 0 ? (
                            <ul className="list-group list-group-flush">
                                {depts.map(d => (
                                    <li key={d.id} className="list-group-item px-0 py-3 border-bottom">
                                        <div className="d-flex align-items-center">
                                            <i className="bi bi-building-fill text-success me-3 fs-5"></i>
                                            <div>
                                                <h6 className="mb-1 fw-semibold">{d.deptName.toUpperCase()}</h6>
                                                <small className="text-muted">Code: {d.deptCode}</small>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center py-4">
                                <i className="bi bi-inbox fs-1 text-muted mb-3 d-block"></i>
                                <p className="text-muted mb-0">No departments added yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    );
};

export default AddDepartment;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddCourse = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]); // for existing courses
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

                {/* Add Course Form Card */}
                <div className="card shadow-lg border-0 rounded-4 mb-4">
                    <div className="card-body p-4 p-md-5">
                        <h2 className="text-center mb-4 fw-semibold text-primary">Add Courses</h2>
                        
                        {/* Success Message */}
                        {message && (
                            <div className="alert alert-success alert-dismissible fade show" role="alert">
                                <i className="bi bi-check-circle-fill me-2"></i>
                                {message}
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="courseName" className="form-label fw-medium">
                                    Course Name
                                </label>
                                <select 
                                    id="courseName"
                                    className="form-select form-select-lg transition-all"
                                    value={formData.courseName} 
                                    onChange={e => setFormData({...formData, courseName: e.target.value})} 
                                    required
                                    style={{transition: 'all 0.3s ease'}}
                                >
                                    <option value="">-- Select Course --</option>
                                    {courseOptions.map((course, index) => (
                                        <option key={index} value={course}>
                                            {course}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="mb-4">
                                <label htmlFor="durationYears" className="form-label fw-medium">
                                    Duration (Years)
                                </label>
                                <input 
                                    type="number"
                                    id="durationYears"
                                    className="form-control form-control-lg transition-all"
                                    value={formData.durationYears} 
                                    onChange={e => setFormData({...formData, durationYears: e.target.value})} 
                                    placeholder="Enter duration in years"
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
                                    <i className="bi bi-plus-circle me-2"></i>Add Course
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Existing Courses Card */}
                <div className="card shadow-lg border-0 rounded-4">
                    <div className="card-body p-4 p-md-5">
                        <h3 className="mb-4 fw-semibold text-secondary">
                            <i className="bi bi-list-ul me-2"></i>Existing Courses
                        </h3>
                        
                        {courses.length > 0 ? (
                            <ul className="list-group list-group-flush">
                                {courses.map(c => (
                                    <li key={c.id} className="list-group-item px-0 py-3 border-bottom">
                                        <div className="d-flex align-items-center">
                                            <i className="bi bi-journal-text text-primary me-3 fs-5"></i>
                                            <div>
                                                <h6 className="mb-1 fw-semibold">{c.courseName.toUpperCase()}</h6>
                                                <small className="text-muted">Duration: {c.durationYears} Years</small>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center py-4">
                                <i className="bi bi-inbox fs-1 text-muted mb-3 d-block"></i>
                                <p className="text-muted mb-0">No courses added yet.</p>
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

export default AddCourse;
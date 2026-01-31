import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        <div className="min-vh-100 d-flex flex-column bg-light py-5">
    <div className="container flex-grow-1">
        <div className="row justify-content-center">
            <div className="col-12 col-sm-11 col-md-10 col-lg-10 col-xl-9 px-3 px-sm-4">
                {/* Back Button */}
                <button 
                    className="btn btn-outline-secondary mb-3 transition-all" 
                    onClick={() => navigate(-1)}
                    style={{transition: 'all 0.3s ease'}}
                >
                    <i className="bi bi-arrow-left me-2"></i>Back to Dashboard
                </button>

                {/* Add Subject Form Card */}
                <div className="card shadow-lg border-0 rounded-4 mb-4">
                    <div className="card-body p-4 p-md-5">
                        <h2 className="text-center mb-4 fw-semibold text-primary">Add Subjects</h2>
                        
                        {/* Success Message */}
                        {message && (
                            <div className="alert alert-success alert-dismissible fade show" role="alert">
                                <i className="bi bi-check-circle-fill me-2"></i>
                                {message}
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit}>
                            <div className="row g-4">
                                {/* Subject Name */}
                                <div className="col-md-6">
                                    <label htmlFor="subjectName" className="form-label fw-medium">
                                        Subject Name
                                    </label>
                                    <input 
                                        type="text" 
                                        id="subjectName"
                                        name="subjectName"
                                        className="form-control form-control-lg transition-all"
                                        placeholder="e.g. Data Structures"
                                        value={formData.subjectName} 
                                        onChange={handleChange} 
                                        required
                                        style={{transition: 'all 0.3s ease'}}
                                    />
                                </div>
                                
                                {/* Subject Code */}
                                <div className="col-md-6">
                                    <label htmlFor="subjectCode" className="form-label fw-medium">
                                        Subject Code
                                    </label>
                                    <input 
                                        type="text"
                                        id="subjectCode"
                                        name="subjectCode"
                                        className="form-control form-control-lg transition-all"
                                        placeholder="e.g. CS102"
                                        value={formData.subjectCode} 
                                        onChange={handleChange} 
                                        required
                                        style={{transition: 'all 0.3s ease'}}
                                    />
                                </div>

                                {/* Semester */}
                                <div className="col-md-6">
                                    <label htmlFor="semester" className="form-label fw-medium">
                                        Semester
                                    </label>
                                    <input 
                                        type="number"
                                        id="semester"
                                        name="semester"
                                        className="form-control form-control-lg transition-all"
                                        value={formData.semester} 
                                        onChange={handleChange} 
                                        required 
                                        min="1" 
                                        max="8"
                                        placeholder="1-8"
                                        style={{transition: 'all 0.3s ease'}}
                                    />
                                </div>

                                {/* Course */}
                                <div className="col-md-6">
                                    <label htmlFor="courseName" className="form-label fw-medium">
                                        Course
                                    </label>
                                    <select 
                                        id="courseName"
                                        name="courseName"
                                        className="form-select form-select-lg transition-all"
                                        value={formData.courseName} 
                                        onChange={handleChange} 
                                        required
                                        style={{transition: 'all 0.3s ease'}}
                                    >
                                        <option value="">-- Select Course --</option>
                                        {courses.map(c => (
                                            <option key={c.id} value={c.courseName}>{c.courseName}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Branch / Department */}
                                <div className="col-12">
                                    <label htmlFor="branchName" className="form-label fw-medium">
                                        Branch / Department
                                    </label>
                                    <select 
                                        id="branchName"
                                        name="branchName"
                                        className="form-select form-select-lg transition-all"
                                        value={formData.branchName} 
                                        onChange={handleChange} 
                                        required
                                        style={{transition: 'all 0.3s ease'}}
                                    >
                                        <option value="">-- Select Branch --</option>
                                        {depts.map(d => (
                                            <option key={d.id} value={d.deptName}>{d.deptName}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Submit Button */}
                                <div className="col-12 mt-4">
                                    <div className="d-grid">
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary btn-lg fw-semibold transition-all"
                                            style={{transition: 'all 0.3s ease'}}
                                        >
                                            <i className="bi bi-plus-circle me-2"></i>Add Subject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Existing Subjects Card */}
                <div className="card shadow-lg border-0 rounded-4">
                    <div className="card-body p-4 p-md-5">
                        <h3 className="mb-4 fw-semibold text-secondary">
                            <i className="bi bi-book-half me-2"></i>Existing Subjects
                        </h3>
                        
                        {subjects.length === 0 ? (
                            <div className="text-center py-4">
                                <i className="bi bi-inbox fs-1 text-muted mb-3 d-block"></i>
                                <p className="text-muted mb-0">No subjects found.</p>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th scope="col" className="fw-semibold">Code</th>
                                            <th scope="col" className="fw-semibold">Subject Name</th>
                                            <th scope="col" className="fw-semibold text-center">Sem</th>
                                            <th scope="col" className="fw-semibold">Course</th>
                                            <th scope="col" className="fw-semibold">Branch</th>
                                            <th scope="col" className="fw-semibold text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subjects.map(sub => (
                                            <tr key={sub.id}>
                                                <td><span className="badge bg-primary">{sub.subjectCode}</span></td>
                                                <td className="fw-medium">{sub.subjectName}</td>
                                                <td className="text-center"><span className="badge bg-secondary">{sub.semester}</span></td>
                                                <td className="text-muted small">{sub.courseName}</td>
                                                <td className="text-muted small">{sub.branchName}</td>
                                                <td className="text-center">
                                                    <button 
                                                        onClick={() => handleDelete(sub.id)}
                                                        className="btn btn-danger btn-sm transition-all"
                                                        style={{transition: 'all 0.3s ease'}}
                                                    >
                                                        <i className="bi bi-trash me-1"></i>Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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

export default AddSubjects;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UploadStudyMaterial = () => {
    const navigate = useNavigate();

    // 1. Context State (Auto-filled)
    const [course, setCourse] = useState('');
    const [branch, setBranch] = useState('');
    const [facultyName, setFacultyName] = useState('');
    
    // 2. User Input State
    const [semester, setSemester] = useState('1');
    const [section, setSection] = useState('A');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(true);

    // 3. ✅ NEW: My Uploads State
    const [myUploads, setMyUploads] = useState([]);

    // --- INITIALIZE ---
    useEffect(() => {
        const fetchContext = async () => {
            try {
                const eid = localStorage.getItem('eid');
                if (!eid) {
                    alert("Please Login First");
                    navigate('/');
                    return;
                }

                // A. Fetch Profile
                const res = await axios.get(`http://localhost:8080/api/employees/profile/${eid}`);
                const profile = res.data;

                setCourse(profile.course);      
                setBranch(profile.department);   
                setFacultyName(profile.employeeName);
                setLoading(false);

                // B. Fetch My Uploads Immediately
                fetchMyUploads(profile.employeeName);

            } catch (error) {
                console.error("Error loading profile", error);
                alert("Could not load faculty details.");
                navigate('/');
            }
        };

        fetchContext();
    }, [navigate]);

    // --- HELPER: Fetch My Uploads ---
    const fetchMyUploads = async (name) => {
        try {
            const res = await axios.get('http://localhost:8080/api/study-material/faculty-list', {
                params: { uploadedBy: name }
            });
            setMyUploads(res.data);
        } catch (error) {
            console.error("Error fetching uploads", error);
        }
    };

    // --- HANDLE UPLOAD ---
    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please select a file");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("course", course);
        formData.append("branch", branch);
        formData.append("semester", semester);
        formData.append("section", section);
        formData.append("uploadedBy", facultyName);
        formData.append("file", file);

        try {
            await axios.post('http://localhost:8080/api/study-material/upload', formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            alert("Material Uploaded Successfully!");
            
            // Clear Form
            setTitle('');
            setDescription('');
            setFile(null);
            document.getElementById('fileInput').value = ""; 

            // ✅ Refresh Table
            fetchMyUploads(facultyName);

        } catch (error) {
            console.error(error);
            alert("Upload Failed. Please try again.");
        }
    };

    // --- HANDLE DELETE ---
    const handleDelete = async (id) => {
        if(!window.confirm("Are you sure you want to delete this file? Students won't be able to see it anymore.")) return;
        
        try {
            await axios.delete(`http://localhost:8080/api/study-material/delete/${id}`);
            // Refresh Table
            fetchMyUploads(facultyName);
        } catch (error) {
            alert("Failed to delete file.");
        }
    };

    // --- HANDLE DOWNLOAD (Optional Preview) ---
    const handleDownload = (id, fileName) => {
        const url = `http://localhost:8080/api/study-material/download/${id}`;
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
    };

    if (loading) return <div className="text-center mt-5">Loading Context...</div>;

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    
                    {/* --- UPLOAD CARD --- */}
                    <div className="card shadow-lg border-0 rounded-4 mb-5">
                        <div className="card-header bg-primary text-white text-center py-3 rounded-top-4">
                            <h4 className="mb-0 fw-bold">Upload Study Material</h4>
                        </div>
                        <button 
                    className="btn btn-outline-secondary mb-3 transition-all" 
                    onClick={() => navigate(-1)}
                    style={{transition: 'all 0.3s ease'}}
                >
                    <i className="bi bi-arrow-left me-2"></i>Back
                </button>
                        <div className="card-body p-4">
                            {/* Context Banner */}
                            <div className="alert alert-primary d-flex align-items-center mb-4" role="alert">
                                <div>
                                    <div className="fw-bold fs-5">
                                        {course} <span className="mx-1">•</span> {branch}
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleUpload}>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Title</label>
                                    <input type="text" className="form-control" placeholder="e.g. Unit 1 Notes" value={title} onChange={e => setTitle(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Description</label>
                                    <textarea className="form-control" rows="2" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                                </div>

                                <div className="row g-3 mb-4">
                                    <div className="col-6">
                                        <label className="form-label fw-bold">Semester</label>
                                        <select className="form-select" value={semester} onChange={e => setSemester(e.target.value)}>
                                            {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label fw-bold">Section</label>
                                        <select className="form-select" value={section} onChange={e => setSection(e.target.value)}>
                                            <option value="All">All Sections</option>
                                            {["A","B","C"].map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-bold">Attach File</label>
                                    <input type="file" id="fileInput" className="form-control" onChange={e => setFile(e.target.files[0])} required />
                                </div>

                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary btn-lg fw-bold">
                                        <i className="bi bi-cloud-upload me-2"></i>Upload Material
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* --- MY UPLOADS TABLE --- */}
                    <div className="card shadow-sm border-0 rounded-4">
                        <div className="card-header bg-white py-3">
                            <h5 className="mb-0 fw-bold text-secondary">My Upload History</h5>
                        </div>
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="bg-light">
                                        <tr>
                                            <th className="ps-4">Title</th>
                                            <th>Target Class</th>
                                            <th>Date</th>
                                            <th className="text-end pe-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myUploads.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="text-center py-4 text-muted">
                                                    You haven't uploaded any files yet.
                                                </td>
                                            </tr>
                                        ) : (
                                            myUploads.map(item => (
                                                <tr key={item.id}>
                                                    <td className="ps-4">
                                                        <div className="fw-bold">{item.title}</div>
                                                        <small className="text-muted">{item.fileName}</small>
                                                    </td>
                                                    <td>
                                                        <span className="badge bg-secondary">
                                                            Sem {item.semester} - {item.section || "All"}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <small className="text-muted">
                                                            {new Date(item.uploadTime).toLocaleDateString()}
                                                        </small>
                                                    </td>
                                                    <td className="text-end pe-4">
                                                        <button 
                                                            className="btn btn-sm btn-outline-primary me-2"
                                                            onClick={() => handleDownload(item.id, item.fileName)}
                                                            title="Download"
                                                        >
                                                            <i className="bi bi-download"></i>
                                                        </button>
                                                        <button 
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() => handleDelete(item.id)}
                                                            title="Delete"
                                                        >
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default UploadStudyMaterial;
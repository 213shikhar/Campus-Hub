import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Notice = () => {
    const navigate = useNavigate();
    
    // 1. Identify User Role (TPO, Registrar, HOD, etc.)
    // We default to 'Admin' if something goes wrong, but it should be set from Login.
    const userRole = localStorage.getItem('userType') || 'Admin';

    const [notices, setNotices] = useState([]);
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    // 2. Fetch Notices on Load
    const fetchNotices = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/notices/all');
            setNotices(res.data);
        } catch (err) { console.error("Error fetching notices", err); }
    };

    useEffect(() => { fetchNotices(); }, []);

    const handleFileChange = (e) => setFile(e.target.files[0]);

    // 3. Upload Logic
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!file) { alert("Please select a file"); return; }
        
        setIsUploading(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('file', file);
        formData.append('role', userRole); // ✅ Sending Role dynamically

        try {
            await axios.post('http://localhost:8080/api/notices/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessage('Notice uploaded successfully!');
            setTitle('');
            setFile(null);
            fetchNotices(); // Refresh list immediately
        } catch (error) { 
            console.error(error);
            setMessage('Upload failed.'); 
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="min-vh-100 d-flex flex-column bg-light py-5">
    <div className="container flex-grow-1">
        <div className="row justify-content-center">
            <div className="col-12 col-sm-11 col-md-10 col-lg-9 px-3 px-sm-4">
                {/* Back Button */}
                <button 
                    className="btn btn-outline-secondary mb-3 transition-all" 
                    onClick={() => navigate(-1)}
                    style={{transition: 'all 0.3s ease'}}
                >
                    <i className="bi bi-arrow-left me-2"></i>Back
                </button>

                {/* Notice Management Card */}
                <div className="card shadow-lg border-0 rounded-4">
                    <div className="card-body p-4 p-md-5">
                        {/* Header */}
                        <div className="text-center mb-4">
                            <div className="mb-3">
                                <i className="bi bi-megaphone fs-1 text-primary"></i>
                            </div>
                            <h2 className="fw-semibold text-primary mb-2">Notice Board Management</h2>
                            <span className="badge bg-secondary px-3 py-2">
                                <i className="bi bi-person-circle me-1"></i>
                                Logged in as: <strong>{userRole.toUpperCase()}</strong>
                            </span>
                        </div>

                        {/* Message Alert */}
                        {message && (
                            <div 
                                className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`} 
                                role="alert"
                            >
                                <i className={`bi ${message.includes('success') ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} me-2`}></i>
                                {message}
                            </div>
                        )}

                        {/* Upload Section */}
                        <div className="mb-5 pb-4 border-bottom">
                            <h3 className="h5 fw-semibold text-secondary mb-4">
                                <i className="bi bi-cloud-upload me-2"></i>Upload New Notice
                            </h3>
                            
                            <form onSubmit={handleSubmit}>
                                <div className="row g-4">
                                    {/* Notice Title */}
                                    <div className="col-12">
                                        <label htmlFor="title" className="form-label fw-medium">Notice Title</label>
                                        <input 
                                            type="text"
                                            id="title"
                                            className="form-control form-control-lg transition-all"
                                            value={title} 
                                            onChange={(e) => setTitle(e.target.value)} 
                                            placeholder="Enter notice title"
                                            required
                                            style={{transition: 'all 0.3s ease'}}
                                        />
                                    </div>

                                    {/* File Upload */}
                                    <div className="col-12">
                                        <label htmlFor="pdfFile" className="form-label fw-medium">
                                            Select Document (PDF only)
                                        </label>
                                        <input 
                                            type="file"
                                            id="pdfFile"
                                            className="form-control form-control-lg transition-all"
                                            onChange={handleFileChange} 
                                            required 
                                            accept="application/pdf"
                                            style={{transition: 'all 0.3s ease'}}
                                        />
                                        <div className="form-text">
                                            <i className="bi bi-info-circle me-1"></i>
                                            Only PDF files are accepted
                                        </div>
                                    </div>

                                    {/* Upload Button */}
                                    <div className="col-12">
                                        <div className="d-grid">
                                            <button 
                                                type="submit" 
                                                className="btn btn-primary btn-lg fw-semibold transition-all"
                                                disabled={isUploading}
                                                style={{transition: 'all 0.3s ease'}}
                                            >
                                                {isUploading ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                        Uploading...
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="bi bi-upload me-2"></i>Upload Notice
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* View Section */}
                        <div>
                            <h3 className="h5 fw-semibold text-secondary mb-4">
                                <i className="bi bi-list-ul me-2"></i>All Uploaded Notices
                            </h3>
                            
                            {notices.length === 0 ? (
                                <div className="text-center py-5">
                                    <i className="bi bi-inbox fs-1 text-muted mb-3 d-block"></i>
                                    <p className="text-muted mb-0">No notices found.</p>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle">
                                        <thead className="table-light">
                                            <tr>
                                                <th scope="col" className="fw-semibold">Date</th>
                                                <th scope="col" className="fw-semibold">Title</th>
                                                <th scope="col" className="fw-semibold text-center">Uploaded By</th>
                                                <th scope="col" className="fw-semibold text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {notices.map(notice => (
                                                <tr key={notice.id}>
                                                    <td className="text-muted small">{notice.uploadDate}</td>
                                                    <td className="fw-medium">{notice.title}</td>
                                                    <td className="text-center">
                                                        <span className="badge bg-info px-3 py-2 text-capitalize">
                                                            {notice.uploaderRole}
                                                        </span>
                                                    </td>
                                                    <td className="text-center">
                                                        <a 
                                                            href={`http://localhost:8080/api/notices/view/${notice.id}`} 
                                                            target="_blank" 
                                                            rel="noreferrer"
                                                            className="btn btn-sm btn-primary transition-all"
                                                            style={{transition: 'all 0.3s ease'}}
                                                        >
                                                            <i className="bi bi-file-pdf me-1"></i>Open PDF
                                                        </a>
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
</div>
    );
};

export default Notice;
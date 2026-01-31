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
        <div className="form-container">
            <h2>Notice Board Management</h2>
            <p className="role-badge">Logged in as: <strong>{userRole.toUpperCase()}</strong></p>
            
            {message && <p className={message.includes('success') ? "success-msg" : "error-msg"}>{message}</p>}

            {/* --- Upload Section --- */}
            <form onSubmit={handleSubmit} style={{borderBottom: '2px solid #eee', paddingBottom: '20px', marginBottom: '20px'}}>
                <label>Notice Title: </label>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                /><br/>

                <label>Select Document (PDF): </label>
                <input 
                    type="file" 
                    onChange={handleFileChange} 
                    required 
                    accept="application/pdf" 
                />

                <button type="submit" disabled={isUploading}>
                    {isUploading ? 'Uploading...' : 'Upload Notice'}
                </button>
            </form>

            {/* --- View Section --- */}
            <h3>All Uploaded Notices</h3>
            {notices.length === 0 ? <p>No notices found.</p> : (
                <table className="data-table" border="1" style={{width: '100%', borderCollapse: 'collapse'}}>
                    <thead>
                        <tr style={{backgroundColor: '#f8f9fa'}}>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Uploaded By</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notices.map(notice => (
                            <tr key={notice.id}>
                                <td>{notice.uploadDate}</td>
                                <td>{notice.title}</td>
                                <td>
                                    <span className={`badge ${notice.uploaderRole}`}>
                                        {notice.uploaderRole}
                                    </span>
                                </td>
                                <td>
                                    <a 
                                        href={`http://localhost:8080/api/notices/view/${notice.id}`} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        style={{color: '#007bff', fontWeight: 'bold'}}
                                    >
                                        Open PDF
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            
            <button className="back-btn" onClick={() => navigate(-1)} style={{marginTop: '20px'}}>Back</button>
        </div>
    );
};

export default Notice;
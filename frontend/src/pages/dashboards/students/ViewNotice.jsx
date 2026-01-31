import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewNotice = () => {
    const navigate = useNavigate();
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch notices from the existing common endpoint
    useEffect(() => {
        axios.get('http://localhost:8080/api/notices/all')
            .then(res => {
                // Optional: Sort by latest date first
                const sorted = res.data.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
                setNotices(sorted);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching notices", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div style={{textAlign: 'center', marginTop: '20px'}}>Loading Notices...</div>;

    return (
        <div className="table-container" style={{padding: '20px', maxWidth: '900px', margin: '40px auto'}}>
            <h2>Campus Notice Board</h2>
            <button className="back-btn" onClick={() => navigate(-1)} style={{marginBottom: '15px'}}>Back to Dashboard</button>

            {notices.length === 0 ? (
                <div className="empty-state">No notices have been uploaded yet.</div>
            ) : (
                <table className="data-table" border="1" style={{width: '100%', borderCollapse: 'collapse', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
                    <thead>
                        <tr style={{backgroundColor: '#007bff', color: 'white'}}>
                            <th style={{padding: '12px'}}>Date</th>
                            <th style={{padding: '12px'}}>Subject / Title</th>
                            <th style={{padding: '12px'}}>Issued By</th>
                            <th style={{padding: '12px'}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notices.map(notice => (
                            <tr key={notice.id} style={{backgroundColor: '#fff', borderBottom: '1px solid #ddd'}}>
                                <td style={{padding: '10px', textAlign: 'center'}}>
                                    {notice.uploadDate}
                                </td>
                                <td style={{padding: '10px', fontWeight: '500'}}>
                                    {notice.title}
                                </td>
                                <td style={{padding: '10px', textAlign: 'center'}}>
                                    {/* Badge Logic to show who posted it */}
                                    <span style={{
                                        padding: '4px 8px', 
                                        borderRadius: '4px', 
                                        color: 'white',
                                        fontSize: '0.85em',
                                        backgroundColor: 
                                            notice.uploaderRole === 'TPO' ? '#17a2b8' : 
                                            notice.uploaderRole === 'Registrar' ? '#28a745' : 
                                            '#6c757d'
                                    }}>
                                        {notice.uploaderRole}
                                    </span>
                                </td>
                                <td style={{padding: '10px', textAlign: 'center'}}>
                                    <a 
                                        href={`http://localhost:8080/api/notices/view/${notice.id}`} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        style={{
                                            color: '#007bff', 
                                            fontWeight: 'bold', 
                                            textDecoration: 'none',
                                            border: '1px solid #007bff',
                                            padding: '5px 10px',
                                            borderRadius: '4px'
                                        }}
                                    >
                                        View PDF
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ViewNotice;
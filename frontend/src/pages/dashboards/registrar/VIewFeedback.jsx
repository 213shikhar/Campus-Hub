import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewFeedback = () => {
    const navigate = useNavigate();
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/registrar/feedbacks')
            .then(res => setFeedbacks(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div style={{padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
            <h2>System Feedback</h2>
            <button className="back-btn" onClick={() => navigate(-1)} style={{marginBottom: '20px'}}>Back</button>

            <div className="feedback-list">
                {feedbacks.length === 0 ? <p>No feedback available.</p> : 
                    feedbacks.map(f => (
                        <div key={f.id} style={{
                            border: '1px solid #ddd', 
                            padding: '15px', 
                            marginBottom: '10px', 
                            borderRadius: '5px',
                            backgroundColor: '#fff',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>
                            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                                <span style={{
                                    fontWeight: 'bold', 
                                    color: f.roleType === 'student' ? '#28a745' : '#007bff',
                                    textTransform: 'uppercase',
                                    fontSize: '0.8em'
                                }}>
                                    {f.roleType}
                                </span>
                                <span style={{fontSize: '0.8em', color: '#999'}}>
                                    {f.submittedAt ? new Date(f.submittedAt).toLocaleDateString() : 'Date N/A'}
                                </span>
                            </div>
                            <p style={{margin: 0, lineHeight: '1.5'}}>{f.message}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ViewFeedback;
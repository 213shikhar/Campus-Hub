import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudyMaterial = () => {
        const navigate = useNavigate();

    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const admissionNo = localStorage.getItem('admissionNo');
                if (!admissionNo) return;

                // 1. Get Student Context
                const profileRes = await axios.get(`http://localhost:8080/api/students/profile/${admissionNo}`);
                const { course, branch, semester } = profileRes.data;

                // 2. Fetch Materials for this Class
                const matRes = await axios.get('http://localhost:8080/api/study-material/list', {
                    params: { course, branch, semester }
                });
                
                setMaterials(matRes.data);
                setLoading(false);
            } catch (error) {
                console.error("Error loading materials", error);
                setLoading(false);
            }
        };

        fetchMaterials();
    }, []);

    const handleDownload = (id, fileName) => {
        // Trigger browser download
        const url = `http://localhost:8080/api/study-material/download/${id}`;
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
    };

    if (loading) return <div className="text-center mt-5">Loading Notes...</div>;

    return (
        <div className="container mt-4">
            <h2 className="text-primary mb-4 text-center">Study Material & Notes</h2>
            <button 
                    className="btn btn-outline-secondary mb-3 transition-all" 
                    onClick={() => navigate(-1)}
                    style={{transition: 'all 0.3s ease'}}
                >
                    <i className="bi bi-arrow-left me-2"></i>Back
                </button>
            <div className="row">
                {materials.length === 0 ? (
                    <div className="text-center text-muted">No study materials uploaded for your class yet.</div>
                ) : (
                    materials.map(item => (
                        <div className="col-md-6 col-lg-4 mb-4" key={item.id}>
                            <div className="card h-100 shadow-sm border-0">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <h5 className="card-title fw-bold text-dark">{item.title}</h5>
                                        <span className="badge bg-info text-dark">{item.contentType.split('/')[1].toUpperCase()}</span>
                                    </div>
                                    <p className="card-text text-muted small">{item.description}</p>
                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <small className="text-muted fst-italic">By: {item.uploadedBy}</small>
                                        <button 
                                            className="btn btn-primary btn-sm" 
                                            onClick={() => handleDownload(item.id, item.fileName)}
                                        >
                                            <i className="bi bi-download me-2"></i>Download
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default StudyMaterial;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewPlacementRecord = () => {
    const navigate = useNavigate();
    const [placedStudents, setPlacedStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8080/api/tpo/placed-students')
            .then(res => setPlacedStudents(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading Records...</div>;

    return (
        <div className="table-container" style={{padding: '20px'}}>
            <h2>Placement Records</h2>
            <p><strong>Total Placed Students: </strong> {placedStudents.length}</p>
            <button className="back-btn" onClick={() => navigate(-1)}>Back</button>

            {placedStudents.length === 0 ? (
                <p>No placement records found.</p>
            ) : (
                <table border="1" cellPadding="10" style={{width: '100%', borderCollapse: 'collapse', marginTop: '15px'}}>
                    <thead>
                        <tr style={{backgroundColor: '#d4edda'}}>
                            <th>Admission No</th>
                            <th>Name</th>
                            <th>Branch</th>
                            <th>Company</th>
                            <th>Package</th>
                        </tr>
                    </thead>
                    <tbody>
                        {placedStudents.map(s => (
                            <tr key={s.admissionNo}>
                                <td>{s.admissionNo}</td>
                                <td>{s.studentname}</td>
                                <td>{s.branch}</td>
                                <td><strong>{s.companyName}</strong></td>
                                <td>{s.packageLPA}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ViewPlacementRecord;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewBatchList = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8080/api/tpo/batch-list')
            .then(res => setStudents(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading Batch Data...</div>;

    return (
        <div className="table-container" style={{padding: '20px'}}>
            <h2>Eligible Batch List (Final & Pre-Final Year)</h2>
            <p><strong>Total Students: </strong> {students.length}</p>
            <button className="back-btn" onClick={() => navigate(-1)}>Back</button>

            {students.length === 0 ? (
                <p>No records found.</p>
            ) : (
                <table border="1" cellPadding="10" style={{width: '100%', borderCollapse: 'collapse', marginTop: '15px'}}>
                    <thead>
                        <tr style={{backgroundColor: '#f2f2f2'}}>
                            <th>Admission No</th>
                            <th>Name</th>
                            <th>Course</th>
                            <th>Branch</th>
                            <th>Semester</th>
                            <th>Mobile</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(s => (
                            <tr key={s.admissionNo}>
                                <td>{s.admissionNo}</td>
                                <td>{s.studentname}</td>
                                <td>{s.course}</td>
                                <td>{s.branch}</td>
                                <td>{s.semester}</td>
                                <td>{s.mobile}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ViewBatchList;
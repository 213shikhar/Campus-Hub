import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewEmployees = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:8080/api/registrar/employees')
            .then(res => setEmployees(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleEdit = async (eid) => {
        try {
            const res = await axios.get(`http://localhost:8080/api/employees/profile/${eid}`);
            // Reusing existing UpdateEmployeeForm
            navigate('/update-employee-profile', { state: { profile: res.data } });
        } catch (error) { alert("Could not fetch profile."); }
    };

    return (
        <div className="table-container" style={{padding: '20px'}}>
            <h2>Employee Management</h2>
            <button className="back-btn" onClick={() => navigate(-1)}>Back</button>

            <table border="1" cellPadding="10" style={{width: '100%', borderCollapse: 'collapse', marginTop: '20px'}}>
                <thead>
                    <tr style={{backgroundColor: '#f2f2f2'}}>
                        <th>Emp ID</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Department</th>
                        <th>Mobile</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(emp => (
                        <tr key={emp.eid}>
                            <td>{emp.eid}</td>
                            <td>{emp.employeeName}</td>
                            <td>{emp.type}</td>
                            <td>{emp.department}</td>
                            <td>{emp.mobile}</td>
                            <td>
                                <button 
                                    onClick={() => handleEdit(emp.eid)}
                                    style={{backgroundColor: '#007bff', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer'}}
                                >
                                    Modify
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewEmployees;
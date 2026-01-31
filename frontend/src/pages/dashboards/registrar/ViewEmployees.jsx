import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewEmployees = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    
    // Filter States
    const [departments, setDepartments] = useState([]);
    const [selectedDept, setSelectedDept] = useState('');

    // 1. Fetch Department Options (for the dropdown)
    useEffect(() => {
        axios.get('http://localhost:8080/api/registrar/departments')
            .then(res => setDepartments(res.data))
            .catch(err => console.error("Error loading departments", err));
    }, []);

    // 2. Fetch Employees (With or Without Filter)
    const fetchEmployees = async () => {
        try {
            let url = 'http://localhost:8080/api/registrar/employees';
            
            // Append Query Params if a department is selected
            if (selectedDept) {
                url += `?dept=${selectedDept}`;
            }

            const res = await axios.get(url);
            setEmployees(res.data);
        } catch (err) { console.error("Error fetching employees", err); }
    };

    // Trigger fetch when the filter changes
    useEffect(() => {
        fetchEmployees();
    }, [selectedDept]);

    // 3. Delete Functionality
    const handleDelete = async (eid) => {
        if(window.confirm(`Are you sure you want to delete Employee ${eid}? This cannot be undone.`)) {
            try {
                // Matches the Delete Endpoint in RegistrarController
                await axios.delete(`http://localhost:8080/api/registrar/employee/delete/${eid}`);
                alert("Employee Deleted Successfully");
                fetchEmployees(); // Refresh the list
            } catch (err) { 
                console.error(err);
                alert("Failed to delete employee."); 
            }
        }
    };

    // 4. Modify Functionality
    const handleEdit = async (eid) => {
        try {
            const res = await axios.get(`http://localhost:8080/api/employees/profile/${eid}`);
            navigate('/update-employee-profile', { state: { profile: res.data } });
        } catch (error) { alert("Could not fetch profile."); }
    };

    return (
        <div className="table-container" style={{padding: '20px'}}>
            <h2>Employee Management</h2>
            <button className="back-btn" onClick={() => navigate(-1)} style={{marginBottom: '15px', padding: '8px 15px', cursor: 'pointer'}}>
                &larr; Back to Dashboard
            </button>

            {/* --- FILTER SECTION --- */}
            <div className="filter-bar" style={{marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px', border: '1px solid #ddd'}}>
                <label style={{marginRight: '10px', fontWeight: 'bold'}}>Filter By Department:</label>
                
                <select 
                    onChange={(e) => setSelectedDept(e.target.value)} 
                    value={selectedDept} 
                    style={{padding: '5px', marginRight: '10px'}}
                >
                    <option value="">-- All Departments --</option>
                    {departments.map(dept => (
                        <option key={dept.id} value={dept.deptName}>
                            {dept.deptName}
                        </option>
                    ))}
                </select>

                <button onClick={fetchEmployees} style={{padding: '5px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
                    Refresh List
                </button>
            </div>

            {/* --- TABLE SECTION --- */}
            {employees.length === 0 ? (
                 <p>No employees found matching the criteria.</p>
            ) : (
                <table border="1" cellPadding="10" style={{width: '100%', borderCollapse: 'collapse'}}>
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
                                <td>{emp.department.toUpperCase()}</td>
                                <td>{emp.mobile}</td>
                                <td>
                                    {/* EDIT BUTTON */}
                                    <button 
                                        onClick={() => handleEdit(emp.eid)}
                                        style={{marginRight: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '3px'}}
                                    >
                                        Modify
                                    </button>

                                    {/* DELETE BUTTON */}
                                    <button 
                                        onClick={() => handleDelete(emp.eid)}
                                        style={{backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '3px'}}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ViewEmployees;
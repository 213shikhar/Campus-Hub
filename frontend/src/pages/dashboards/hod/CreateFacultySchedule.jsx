import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateFacultySchedule = () => {
    const [faculties, setFaculties] = useState([]);
    const [selectedFacultyId, setSelectedFacultyId] = useState('');
    const [timetable, setTimetable] = useState([]);
    
    const timeSlots = ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00", "04:00-05:00"];
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Load Faculties on Mount
    useEffect(() => {
        axios.get('http://localhost:8080/api/registrar/employees?role=faculty') 
            .then(res => setFaculties(res.data))
            .catch(err => console.error("Error loading faculties", err));
    }, []);

    // Load Schedule when Faculty Selected
    useEffect(() => {
        if (!selectedFacultyId) {
            setTimetable([]);
            return;
        }

        axios.get(`http://localhost:8080/api/timetable/faculty/${selectedFacultyId}`)
            .then(res => setTimetable(res.data))
            .catch(err => console.error(err));
    }, [selectedFacultyId]);

    const getEntry = (day, time) => {
        return timetable.find(t => t.dayOfWeek === day && t.timeSlot === time);
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4 fw-bold text-success">View Faculty Workload</h2>

            {/* Selection Bar */}
            <div className="card p-4 shadow-sm mb-4 bg-light">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6">
                        <label className="form-label fw-bold">Select Faculty</label>
                        <select 
                            className="form-select form-select-lg" 
                            value={selectedFacultyId} 
                            onChange={e => setSelectedFacultyId(e.target.value)}
                        >
                            <option value="">-- Select Faculty --</option>
                            {faculties.map(fac => (
                                <option key={fac.id} value={fac.eid}>
                                    {fac.employeeName} - {fac.department} ({fac.eid})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Timetable Grid */}
            {selectedFacultyId && (
                <div className="table-responsive shadow-lg rounded-3">
                    <table className="table table-bordered text-center align-middle">
                        <thead className="bg-success text-white">
                            <tr>
                                <th className="py-3">Day / Time</th>
                                {timeSlots.map(slot => <th key={slot} className="py-3">{slot}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {days.map(day => (
                                <tr key={day}>
                                    <td className="fw-bold bg-light">{day}</td>
                                    {timeSlots.map(slot => {
                                        const entry = getEntry(day, slot);
                                        return (
                                            <td key={slot} className={entry ? 'bg-success bg-opacity-10' : ''} style={{height: '100px'}}>
                                                {entry ? (
                                                    <div>
                                                        <div className="fw-bold text-success">{entry.subjectName}</div>
                                                        <div className="badge bg-dark mt-1">
                                                            {entry.course} {entry.branch} {entry.semester}-{entry.section}
                                                        </div>
                                                        <div className="small text-muted mt-1">{entry.roomNo}</div>
                                                    </div>
                                                ) : (
                                                    <span className="text-muted opacity-25">-</span>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CreateFacultySchedule;
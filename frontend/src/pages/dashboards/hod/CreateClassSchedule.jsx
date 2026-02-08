import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateClassSchedule = () => {
    // 1. Context State (What class are we editing?)
    const [course, setCourse] = useState('');
    const [branch, setBranch] = useState('');
    const [semester, setSemester] = useState('');
    const [section, setSection] = useState('');

    // 2. Data Lists (Dropdowns)
    const [timetable, setTimetable] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [faculties, setFaculties] = useState([]);
    
    // 3. Modal State (For adding a new entry)
    const [showModal, setShowModal] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState({ day: '', time: '' });
    const [newEntry, setNewEntry] = useState({ subjectCode: '', facultyId: '', roomNo: '' });

    // Constants
    const timeSlots = ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00", "04:00-05:00"];
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // --- FETCH DATA ON LOAD ---
    useEffect(() => {
        // Fetch Subjects
        axios.get('http://localhost:8080/api/registrar/subjects')
            .then(res => setSubjects(res.data))
            .catch(err => console.error("Error loading subjects", err));

        // Fetch Faculties (Employees)
        axios.get('http://localhost:8080/api/registrar/employees?role=faculty') 
            .then(res => setFaculties(res.data))
            .catch(err => console.error("Error loading faculties", err));
    }, []);

    // --- FETCH TIMETABLE (When Context Changes) ---
    const fetchTimetable = () => {
        if (!course || !branch || !semester || !section) return;

        axios.get(`http://localhost:8080/api/timetable/student`, {
            params: { course, branch, semester, section }
        })
        .then(res => setTimetable(res.data))
        .catch(err => console.error("Error fetching timetable", err));
    };

    // --- HELPER: Find Entry for a specific Cell ---
    const getEntry = (day, time) => {
        return timetable.find(t => t.dayOfWeek === day && t.timeSlot === time);
    };

    // --- HANDLER: Click on Empty Slot ---
    const handleCellClick = (day, time) => {
        setSelectedSlot({ day, time });
        setNewEntry({ subjectCode: '', facultyId: '', roomNo: '' }); // Reset form
        setShowModal(true);
    };

    // --- HANDLER: Delete Entry ---
    const handleDelete = async (id) => {
        if(!window.confirm("Delete this class?")) return;
        try {
            await axios.delete(`http://localhost:8080/api/timetable/delete/${id}`);
            fetchTimetable(); // Refresh grid
        } catch (error) {
            alert("Failed to delete entry");
        }
    };

    // --- HANDLER: Save New Entry ---
    const handleSave = async () => {
        if (!newEntry.subjectCode || !newEntry.facultyId) {
            alert("Please select Subject and Faculty");
            return;
        }

        const selectedSubject = subjects.find(s => s.subCode === newEntry.subjectCode);
        const selectedFaculty = faculties.find(f => f.eid === newEntry.facultyId);

        const payload = {
            course, branch, semester, section,
            dayOfWeek: selectedSlot.day,
            timeSlot: selectedSlot.time,
            subjectCode: newEntry.subjectCode,
            subjectName: selectedSubject?.subName || "",
            facultyId: newEntry.facultyId,
            facultyName: selectedFaculty?.employeeName || "",
            roomNo: newEntry.roomNo
        };

        try {
            await axios.post('http://localhost:8080/api/timetable/add', payload);
            alert("Class Assigned Successfully!");
            setShowModal(false);
            fetchTimetable(); // Refresh grid
        } catch (error) {
            console.error("Conflict Error:", error);
            if (error.response && error.response.status === 400) {
                alert("CONFLICT: " + error.response.data); // Show backend conflict message
            } else {
                alert("Failed to assign class.");
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4 fw-bold text-primary">Create Class Schedule</h2>

            {/* 1. Context Selection Bar */}
            <div className="card p-4 shadow-sm mb-4 bg-light">
                <div className="row g-3">
                    <div className="col-md-3">
                        <label className="form-label fw-bold">Course</label>
                        <select className="form-select" value={course} onChange={e => setCourse(e.target.value)}>
                            <option value="">Select Course</option>
                            <option value="B.Tech">B.Tech</option>
                            <option value="M.Tech">M.Tech</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label fw-bold">Branch</label>
                        <select className="form-select" value={branch} onChange={e => setBranch(e.target.value)}>
                            <option value="">Select Branch</option>
                            <option value="CSE">CSE</option>
                            <option value="ECE">ECE</option>
                            <option value="ME">ME</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <label className="form-label fw-bold">Semester</label>
                        <select className="form-select" value={semester} onChange={e => setSemester(e.target.value)}>
                            <option value="">Sem</option>
                            {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="col-md-2">
                        <label className="form-label fw-bold">Section</label>
                        <select className="form-select" value={section} onChange={e => setSection(e.target.value)}>
                            <option value="">Sec</option>
                            {["A","B","C"].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="col-md-2 d-flex align-items-end">
                        <button className="btn btn-primary w-100 fw-bold" onClick={fetchTimetable}>
                            <i className="bi bi-search me-2"></i> Load Grid
                        </button>
                    </div>
                </div>
            </div>

            {/* 2. The Timetable Grid */}
            {timetable && (
                <div className="table-responsive shadow-lg rounded-3">
                    <table className="table table-bordered text-center align-middle">
                        <thead className="bg-primary text-white">
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
                                            <td key={slot} 
                                                className={`position-relative ${entry ? 'bg-info bg-opacity-10' : ''}`}
                                                style={{height: '100px', cursor: 'pointer', transition: 'all 0.2s'}}
                                                onClick={() => !entry && handleCellClick(day, slot)}
                                            >
                                                {entry ? (
                                                    <div className="p-1">
                                                        <div className="fw-bold text-primary small">{entry.subjectName}</div>
                                                        <div className="text-muted small" style={{fontSize: '0.8rem'}}>{entry.facultyName}</div>
                                                        <div className="badge bg-secondary mt-1">{entry.roomNo}</div>
                                                        <button 
                                                            className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 py-0 px-1"
                                                            style={{fontSize: '0.6rem'}}
                                                            onClick={(e) => { e.stopPropagation(); handleDelete(entry.id); }}
                                                        >
                                                            X
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className="text-muted opacity-25 fs-2">+</span>
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

            {/* 3. Modal for Assigning Class */}
            {showModal && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">
                                    Assign Class ({selectedSlot.day}, {selectedSlot.time})
                                </h5>
                                <button className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body p-4">
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Subject</label>
                                    <select 
                                        className="form-select" 
                                        value={newEntry.subjectCode} 
                                        onChange={e => setNewEntry({...newEntry, subjectCode: e.target.value})}
                                    >
                                        <option value="">-- Select Subject --</option>
                                        {subjects.map(sub => (
                                            <option key={sub.id} value={sub.subCode}>
                                                {sub.subName} ({sub.subCode})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Faculty</label>
                                    <select 
                                        className="form-select" 
                                        value={newEntry.facultyId} 
                                        onChange={e => setNewEntry({...newEntry, facultyId: e.target.value})}
                                    >
                                        <option value="">-- Select Faculty --</option>
                                        {faculties.map(fac => (
                                            <option key={fac.id} value={fac.eid}>
                                                {fac.employeeName} ({fac.department})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Room No (Optional)</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="e.g. Lab-1"
                                        value={newEntry.roomNo}
                                        onChange={e => setNewEntry({...newEntry, roomNo: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button className="btn btn-primary fw-bold" onClick={handleSave}>Save Class</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateClassSchedule;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateClassSchedule = () => {
    const navigate = useNavigate();

    // 1. Context State (Course/Branch are now AUTO-FILLED)
    const [course, setCourse] = useState('');
    const [branch, setBranch] = useState('');
    const [semester, setSemester] = useState('');
    const [section, setSection] = useState('');
    const [loadingProfile, setLoadingProfile] = useState(true); // New loading state

    // 2. Data Lists
    const [timetable, setTimetable] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [faculties, setFaculties] = useState([]);
    
    // 3. Modal State
    const [showModal, setShowModal] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState({ day: '', time: '' });
    const [newEntry, setNewEntry] = useState({ subjectCode: '', facultyId: '', roomNo: '' });

    const timeSlots = ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00", "04:00-05:00"];
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // --- FETCH DATA ON LOAD ---
    useEffect(() => {
        const initializeHOD = async () => {
            try {
                // A. Check Login
                const eid = localStorage.getItem('eid');
                if (!eid) {
                    alert("Please Login First");
                    navigate('/');
                    return;
                }

                // B. Fetch HOD Profile (To lock Course & Branch)
                const profileRes = await axios.get(`http://localhost:8080/api/employees/profile/${eid}`);
                const hodProfile = profileRes.data;

                console.log("HOD Profile Loaded:", hodProfile);

                // LOCK THE STATE
                setCourse(hodProfile.course);     // e.g., "B.Tech"
                setBranch(hodProfile.department); // e.g., "CSE"
                setLoadingProfile(false);

                // C. Fetch Subjects (All subjects, filtering happens later if needed)
                const subRes = await axios.get('http://localhost:8080/api/registrar/subjects');
                setSubjects(subRes.data);

                // D. Fetch Faculties (Only from HOD's Department)
                // Filter employees so HOD can only assign their own staff
                const facRes = await axios.get('http://localhost:8080/api/registrar/employees?role=faculty');
                const deptFaculties = facRes.data.filter(f => f.department === hodProfile.department);
                setFaculties(deptFaculties);

            } catch (error) {
                console.error("Error initializing HOD Dashboard:", error);
                alert("Failed to load HOD profile data.");
            }
        };

        initializeHOD();
    }, [navigate]);

    // --- FETCH TIMETABLE (Triggered by button) ---
    const fetchTimetable = () => {
        if (!course || !branch || !semester || !section) {
            alert("Please select Semester and Section.");
            return;
        }

        axios.get(`http://localhost:8080/api/timetable/student`, {
            params: { course, branch, semester, section }
        })
        .then(res => setTimetable(res.data))
        .catch(err => console.error("Error fetching timetable", err));
    };

    const getEntry = (day, time) => {
        return timetable.find(t => t.dayOfWeek === day && t.timeSlot === time);
    };

    const handleCellClick = (day, time) => {
        setSelectedSlot({ day, time });
        setNewEntry({ subjectCode: '', facultyId: '', roomNo: '' });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if(!window.confirm("Delete this class?")) return;
        try {
            await axios.delete(`http://localhost:8080/api/timetable/delete/${id}`);
            fetchTimetable(); 
        } catch (error) {
            alert("Failed to delete entry");
        }
    };

    const handleSave = async () => {
        if (!newEntry.subjectCode || !newEntry.facultyId) {
            alert("Please select Subject and Faculty");
            return;
        }

        const selectedSubject = subjects.find(s => s.subjectCode === newEntry.subjectCode || s.subCode === newEntry.subjectCode);
        const selectedFaculty = faculties.find(f => f.eid === newEntry.facultyId);

        const payload = {
            course, branch, semester, section,
            dayOfWeek: selectedSlot.day,
            timeSlot: selectedSlot.time,
            subjectCode: newEntry.subjectCode,
            subjectName: selectedSubject ? (selectedSubject.subjectName || selectedSubject.subName) : "",
            facultyId: newEntry.facultyId,
            facultyName: selectedFaculty ? selectedFaculty.employeeName : "",
            roomNo: newEntry.roomNo
        };

        try {
            await axios.post('http://localhost:8080/api/timetable/add', payload);
            alert("Class Assigned Successfully!");
            setShowModal(false);
            fetchTimetable(); 
        } catch (error) {
            console.error("Conflict Error:", error);
            if (error.response && error.response.status === 400) {
                alert("CONFLICT: " + error.response.data); 
            } else {
                alert("Failed to assign class.");
            }
        }
    };

    if (loadingProfile) return <div className="text-center mt-5">Loading HOD Context...</div>;

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4 fw-bold text-primary">Manage Class Schedule</h2>

            {/* Context Selection Bar */}
            <div className="card p-4 shadow-sm mb-4 bg-light border-start border-5 border-primary">
                <div className="row g-3 align-items-center">
                    
                    {/* ✅ LOCKED: Course & Branch Display */}
                    <div className="col-md-5">
                        <div className="d-flex flex-column">
                            <span className="text-muted small text-uppercase fw-bold">Department Context</span>
                            <h4 className="fw-bold text-dark m-0">
                                {course} <span className="text-primary">|</span> {branch}
                            </h4>
                        </div>
                    </div>

                    {/* Semester Selection */}
                    <div className="col-md-2">
                        <label className="form-label fw-bold">Semester</label>
                        <select className="form-select" value={semester} onChange={e => setSemester(e.target.value)}>
                            <option value="">Sem</option>
                            {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>

                    {/* Section Selection */}
                    <div className="col-md-2">
                        <label className="form-label fw-bold">Section</label>
                        <select className="form-select" value={section} onChange={e => setSection(e.target.value)}>
                            <option value="">Sec</option>
                            {["A","B","C"].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>

                    {/* Load Button */}
                    <div className="col-md-3">
                        <label className="d-block mb-2">&nbsp;</label> {/* Spacer */}
                        <button className="btn btn-primary w-100 fw-bold shadow-sm" onClick={fetchTimetable}>
                            <i className="bi bi-calendar3 me-2"></i> Load Schedule
                        </button>
                    </div>
                </div>
            </div>
            <button 
                            className="btn btn-outline-secondary mb-3 transition-all" 
                            onClick={() => navigate(-1)}
                            style={{transition: 'all 0.3s ease'}}
                        >
                            <i className="bi bi-arrow-left me-2"></i>Back
                        </button>

            {/* Timetable Grid (Only shows after loading) */}
            {semester && section && timetable.length >= 0 && (
                <div className="table-responsive shadow-lg rounded-3 animate__animated animate__fadeIn">
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
                                                onMouseOver={(e) => !entry && (e.currentTarget.style.backgroundColor = '#f8f9fa')}
                                                onMouseOut={(e) => !entry && (e.currentTarget.style.backgroundColor = '')}
                                            >
                                                {entry ? (
                                                    <div className="p-1">
                                                        <div className="fw-bold text-primary small">{entry.subjectName}</div>
                                                        <div className="text-muted small" style={{fontSize: '0.8rem'}}>{entry.facultyName}</div>
                                                        <div className="badge bg-secondary mt-1">{entry.roomNo}</div>
                                                        <button 
                                                            className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 py-0 px-1"
                                                            style={{fontSize: '0.6rem', zIndex: 10}}
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

            {/* Modal */}
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
                                            <option key={sub.id} value={sub.subjectCode || sub.subCode}>
                                                {sub.subjectName || sub.subName} ({sub.subjectCode || sub.subCode})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Faculty (Dept Only)</label>
                                    <select 
                                        className="form-select" 
                                        value={newEntry.facultyId} 
                                        onChange={e => setNewEntry({...newEntry, facultyId: e.target.value})}
                                    >
                                        <option value="">-- Select Faculty --</option>
                                        {faculties.map(fac => (
                                            <option key={fac.id} value={fac.eid}>
                                                {fac.employeeName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Room No</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
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
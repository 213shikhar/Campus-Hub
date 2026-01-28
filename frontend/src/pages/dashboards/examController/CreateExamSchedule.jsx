import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateExamSchedule = () => {
    const navigate = useNavigate();

    // Form State
    const [formData, setFormData] = useState({
        course: '', branch: '', semester: '', 
        subjectName: '', subjectCode: '', 
        examDate: '', startTime: '', endTime: ''
    });

    // Data for Dropdowns
    const [courses, setCourses] = useState([]);
    const [branches, setBranches] = useState([]);
    const [subjects, setSubjects] = useState([]); // Filtered subjects

    useEffect(() => {
        // Fetch Courses & Branches on load
        axios.get('http://localhost:8080/api/registrar/courses').then(res => setCourses(res.data));
        axios.get('http://localhost:8080/api/registrar/departments').then(res => setBranches(res.data));
    }, []);

    // Fetch Subjects when Class (Course/Branch/Sem) changes
    useEffect(() => {
        if (formData.course && formData.branch && formData.semester) {
            // Assuming you have a route to get subjects by class. 
            // If not, fetch all and filter in JS (Simple for now):
            axios.get('http://localhost:8080/api/registrar/subjects')
                .then(res => {
                    const filtered = res.data.filter(s => 
                        s.courseName === formData.course && 
                        s.branchName === formData.branch && 
                        s.semester == formData.semester // Loose equality for string/int
                    );
                    setSubjects(filtered);
                });
        }
    }, [formData.course, formData.branch, formData.semester]);

    const handleSubjectChange = (e) => {
        const subName = e.target.value;
        const selectedSub = subjects.find(s => s.subjectName === subName);
        setFormData({ 
            ...formData, 
            subjectName: subName, 
            subjectCode: selectedSub ? selectedSub.subjectCode : '' 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/exam/schedule/add', formData);
            alert("Exam Added Successfully!");
            // Optional: Reset only date/subject fields to add more faster
        } catch (err) {
            alert("Failed to schedule exam.");
        }
    };

    return (
        <div className="form-container" style={{maxWidth: '800px', margin: '40px auto', padding: '20px', border: '1px solid #ddd'}}>
            <h2 style={{textAlign: 'center'}}>Create Exam Schedule</h2>
            <form onSubmit={handleSubmit}>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'10px'}}>
                    {/* Class Selection */}
                    <select required onChange={e => setFormData({...formData, course: e.target.value})}>
                        <option value="">-- Course --</option>
                        {courses.map(c => <option key={c.id} value={c.courseName}>{c.courseName}</option>)}
                    </select>
                    <select required onChange={e => setFormData({...formData, branch: e.target.value})}>
                        <option value="">-- Branch --</option>
                        {branches.map(b => <option key={b.id} value={b.deptName}>{b.deptName}</option>)}
                    </select>
                    <select required onChange={e => setFormData({...formData, semester: e.target.value})}>
                        <option value="">-- Sem --</option>
                        {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>

                <hr style={{margin: '20px 0'}} />

                {/* Exam Details */}
                <label>Subject:</label>
                <select required onChange={handleSubjectChange} value={formData.subjectName}>
                    <option value="">-- Select Subject --</option>
                    {subjects.map(s => <option key={s.id} value={s.subjectName}>{s.subjectName}</option>)}
                </select>

                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'10px', marginTop:'15px'}}>
                    <div>
                        <label>Date:</label>
                        <input type="date" required onChange={e => setFormData({...formData, examDate: e.target.value})} />
                    </div>
                    <div>
                        <label>Start Time:</label>
                        <input type="time" required onChange={e => setFormData({...formData, startTime: e.target.value})} />
                    </div>
                    <div>
                        <label>End Time:</label>
                        <input type="time" required onChange={e => setFormData({...formData, endTime: e.target.value})} />
                    </div>
                </div>

                <button type="submit" style={{marginTop: '20px', width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border:'none'}}>
                    Add to Schedule
                </button>
            </form>
        </div>
    );
};
export default CreateExamSchedule;
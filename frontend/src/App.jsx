// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StudentRegister from './pages/StudentRegister';
import EmployeeRegister from './pages/EmployeeRegister';
import StudentDashboard from './pages/dashboards/students/StudentDashboard';
import FacultyDashboard from './pages/dashboards/faculty/FacultyDashboard';
import HodDashboard from './pages/dashboards/hod/HodDashboard';
import ExamControllerDashboard from './pages/dashboards/examController/ExamControllerDashboard';
// import RegistrarDashboard from './pages/dashboards/registrar/RegistrarDashboard';
// import TpoDashboard from './pages/dashboards/tpo/TpoDashboard';
import Notice from './pages/dashboards/Notice';
import ChangePassword from './pages/dashboards/ChangePassword';
import StudentProfile from './pages/dashboards/students/StudentProfile';
import StudentAttendance from './pages/dashboards/StudentAttendance';
import ViewAssignment from './pages/dashboards/students/ViewAssignment';
import StudentClassSchedule from './pages/dashboards/students/StudentClassSchedule';
import StudentExamSchedule from './pages/dashboards/StudentExamSchedule';
import StudentFeedback from './pages/dashboards/students/StudentFeedback';
import StudentMarks from './pages/dashboards/students/StudentMarks';
import StudyMaterial from './pages/dashboards/students/StudyMaterial';
import ExamControllerProfile from './pages/dashboards/examController/ExamControllerProfile';
import CreateExamSchedule from './pages/dashboards/examController/CreateExamSchedule';
import CreateSeatingPlan from './pages/dashboards/examController/CreateSeatingPlan';
import GenerateAdmitCard from './pages/dashboards/examController/GenerateAdmitCard';

function App() {
  return (
    // 1. You MUST wrap everything in BrowserRouter
    <BrowserRouter>
      <Routes>
        {/* 2. Use specific path "/" for Home, not "*" */}
        <Route path="/" element={<Home />} />
        <Route path="/studentRegister" element={<StudentRegister />} />
        <Route path="/employeeRegister" element={<EmployeeRegister />} />
        {/* <Route path="/login" element={<Login />} /> */}
        
        {/* The Dashboard Route */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
        <Route path="/hod-dashboard" element={<HodDashboard />} />
        <Route path="/exam-contr-dashboard" element={<ExamControllerDashboard />} />
        {/* <Route path="/registrar-dashboard" element={<RegistrarDashboard />} /> */}
        {/* <Route path="/tpo-dashboard" element={<TpoDashboard />} /> */}

        
        {/* The Student's Pages Route */}
        <Route path="/studentProfile" element={<StudentProfile />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/studentMarks" element={<StudentMarks />} />
        <Route path="/studentAttendance" element={<StudentAttendance />} />
        <Route path="/studentAssignment" element={<ViewAssignment />} />
        <Route path="/studentClassSchedule" element={<StudentClassSchedule />} />
        <Route path="/studentExamSchedule" element={<StudentExamSchedule />} />
        <Route path="/studyMaterial" element={<StudyMaterial />} />
        <Route path="/studentFeedback" element={<StudentFeedback />} />
        <Route path="/changePassword" element={<ChangePassword />} />

        {/* The Exam Controller's Pages Route */}
        <Route path="/examContrProfile" element={<ExamControllerProfile />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/createExamSchedule" element={<CreateExamSchedule />} />
        <Route path="/studentExamSchedule" element={<StudentExamSchedule />} />
        <Route path="/createSeatingPlan" element={<CreateSeatingPlan />} />
        <Route path="/generateAdmitCard" element={<GenerateAdmitCard />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        
        {/* <Route path="*" element={<h2>Page Not Found</h2>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
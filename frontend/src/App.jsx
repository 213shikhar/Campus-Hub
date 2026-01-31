// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StudentRegister from './components/StudentRegister';
import EmployeeRegister from './components/EmployeeRegister';
import RegistrarDashboard from './pages/dashboards/registrar/RegistrarDashboard';

// student
import StudentDashboard from './pages/dashboards/students/StudentDashboard';
import StudentProfile from './pages/dashboards/students/StudentProfile';
import StudentAttendance from './pages/dashboards/students/StudentAttendance';
import ViewAssignment from './pages/dashboards/students/ViewAssignment';
import StudentClassSchedule from './pages/dashboards/students/StudentClassSchedule';
import StudentExamSchedule from './pages/dashboards/students/StudentExamSchedule';
import StudentMarks from './pages/dashboards/students/StudentMarks';
import StudyMaterial from './pages/dashboards/students/StudyMaterial';
import ViewNotice from './pages/dashboards/students/ViewNotice';
import UpdateStudentForm from './pages/dashboards/students/UpdateStudentForm';

// exam controller
import ExamControllerDashboard from './pages/dashboards/examController/ExamControllerDashboard';
import CreateExamSchedule from './pages/dashboards/examController/CreateExamSchedule';
import CreateSeatingPlan from './pages/dashboards/examController/CreateSeatingPlan';
import GenerateAdmitCard from './pages/dashboards/examController/GenerateAdmitCard';

// faculty
import FacultyDashboard from './pages/dashboards/faculty/FacultyDashboard';
import FacultySchedule from './pages/dashboards/faculty/FacultySchedule';
import UploadAttendance from './pages/dashboards/faculty/UploadAttendance';
import UploadMarks from './pages/dashboards/faculty/UploadMarks';
import UploadMaterial from './pages/dashboards/faculty/UploadMaterial';

// hod
import HodDashboard from './pages/dashboards/hod/HodDashboard';
import CreateClassSchedule from './pages/dashboards/hod/CreateClassSchedule';
import CreateFacultySchedule from './pages/dashboards/hod/CreateFacultySchedule';

// registrar
import AddCourse from './pages/dashboards/registrar/AddCourse'
import AddDepartment from './pages/dashboards/registrar/AddDepartment'
import AddSubjects from './pages/dashboards/registrar/AddSubjects'
import ViewStudents from './pages/dashboards/registrar/ViewStudents'
import ViewEmployees from './pages/dashboards/registrar/ViewEmployees'
import ViewFeedback from './pages/dashboards/registrar/ViewFeedback'

// comman
import UpdateEmployeeForm from './pages/dashboards/comman/UpdateEmployeeForm';
import Feedback from './pages/dashboards/comman/Feedback';
import Notice from './pages/dashboards/comman/Notice';
import ChangePassword from './pages/dashboards/comman/ChangePassword';
import EmployeeProfile from './pages/dashboards/comman/EmployeeProfile';

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
        <Route path="/registrar-dashboard" element={<RegistrarDashboard />} />
        
        {/* The Student's Pages Route */}
        <Route path="/studentProfile" element={<StudentProfile />} />
        <Route path="/viewNotice" element={<ViewNotice />} />
        <Route path="/studentMarks" element={<StudentMarks />} />
        <Route path="/studentAttendance" element={<StudentAttendance />} />
        <Route path="/studentAssignment" element={<ViewAssignment />} />
        <Route path="/studentClassSchedule" element={<StudentClassSchedule />} />
        <Route path="/studentExamSchedule" element={<StudentExamSchedule />} />
        <Route path="/studyMaterial" element={<StudyMaterial />} />

        {/* The Exam Controller's Pages Route */}
        <Route path="/createExamSchedule" element={<CreateExamSchedule />} />
        <Route path="/studentExamSchedule" element={<StudentExamSchedule />} />
        <Route path="/createSeatingPlan" element={<CreateSeatingPlan />} />
        <Route path="/generateAdmitCard" element={<GenerateAdmitCard />} />

        {/* The Faculty Pages Route */}
        <Route path="/viewSchedule" element={<FacultySchedule />} />
        <Route path="/uploadAttendance" element={<UploadAttendance />} />
        <Route path="/uploadMarks" element={<UploadMarks />} />
        <Route path="/uploadMaterial" element={<UploadMaterial />} />
        <Route path="/studentMarks" element={<StudentMarks />} />
        <Route path="/studentAttendance" element={<StudentAttendance />} />

        {/* The HOD Pages Route */}
        <Route path="/createClassSchedule" element={<CreateClassSchedule />} />
        <Route path="/createFacultySchedule" element={<CreateFacultySchedule />} />

        {/* Registrar Routes */}
        <Route path="/addCourse" element={<AddCourse />} />
        <Route path="/addDepartment" element={<AddDepartment />} />
        <Route path="/addSubjects" element={<AddSubjects />} />
        <Route path="/viewEmployees" element={<ViewEmployees />} />
        <Route path="/viewStudents" element={<ViewStudents />} />
        <Route path="/viewFeedback" element={<ViewFeedback />} />

        {/* Comman Routes */}
        <Route path="/employeeProfile" element={<EmployeeProfile />} />
        <Route path="/uploadNotice" element={<Notice />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/changePassword" element={<ChangePassword />} />

        <Route path="/update-student-profile" element={<UpdateStudentForm />} />
        <Route path="/update-employee-profile" element={<UpdateEmployeeForm />} />
        
        {/* <Route path="*" element={<h2>Page Not Found</h2>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
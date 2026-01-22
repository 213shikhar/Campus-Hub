// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StudentRegister from './pages/StudentRegister';
import EmployeeRegister from './pages/EmployeeRegister';
import StudentDashboard from './pages/dashboards/StudentDashboard';
import FacultyDashboard from './pages/dashboards/FacultyDashboard';
import HodDashboard from './pages/dashboards/HodDashboard';
import ExamControllerDashboard from './pages/dashboards/ExamControllerDashboard';

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
        {/* <Route path="*" element={<h2>Page Not Found</h2>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
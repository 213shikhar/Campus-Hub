// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StudentRegister from './pages/StudentRegister';
import EmployeeRegister from './pages/EmployeeRegister';
import StudentDashboard from './pages/StudentDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';

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
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />

        {/* <Route path="*" element={<h2>Page Not Found</h2>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
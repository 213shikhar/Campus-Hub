// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StudentRegister from './pages/StudentRegister';
import EmployeeRegister from './pages/EmployeeRegister';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
      <Routes>
        {/* When the path is exactly '/', show Home */}
        <Route path="/" element={<Home />} />
        
        {/* When the path is '/register', show Register */}
        <Route path="/studentRegister" element={<StudentRegister />} />
        <Route path="/employeeRegister" element={<EmployeeRegister />} />
        
        {/* Add your other routes here */}
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
  );
}

export default App;
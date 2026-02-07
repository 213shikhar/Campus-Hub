package com.campushub.service;

import com.campushub.dto.LoginRequest;
import com.campushub.model.AdminUser;
import com.campushub.model.Employee;
import com.campushub.model.Student;
import com.campushub.repository.AdminUserRepository;
import com.campushub.repository.EmployeeRepository;
import com.campushub.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LoginService {

    @Autowired private StudentRepository studentRepository;
    @Autowired private EmployeeRepository employeeRepository;
    @Autowired private AdminUserRepository adminUserRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    
    @Transactional
    public Object loginUser(LoginRequest request) {
        
        String role = request.getRole();
        String userId = request.getUserId(); // ✅ Updated variable name
        String rawPassword = request.getPassword();

        // --- 1. STUDENT LOGIN ---
        if ("student".equalsIgnoreCase(role)) {
            Student student = studentRepository.findByAdmissionNo(userId)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + userId));

            if (passwordEncoder.matches(rawPassword, student.getPassword())) {
                student.setPassword(null); // 🔒 Security: Hide hash before sending to UI
                return student;
            } else {
                throw new RuntimeException("Invalid Password");
            }
        }

        // --- 2. EMPLOYEE / ADMIN LOGIN ---
        else if ("employee".equalsIgnoreCase(role)) {
            String type = request.getType(); 

            // CASE A: Registrar or TPO (Stored in AdminUser Table)
            if ("registrar".equalsIgnoreCase(type) || "tpo".equalsIgnoreCase(type)) {
                AdminUser admin = adminUserRepository.findByUserIdAndRole(userId, type)
                    .orElseThrow(() -> new RuntimeException("Admin User not found"));

                if (passwordEncoder.matches(rawPassword, admin.getPassword())) {
                    admin.setPassword(null); // 🔒 Security
                    return admin;
                } else {
                    throw new RuntimeException("Invalid Password");
                }
            }

            // CASE B: Regular Employees (Faculty, HOD, etc.)
            else {
                // Assuming 'eid' is the column for Employee ID in your table
                Employee employee = employeeRepository.findByTypeAndEid(type, userId)
                    .orElseThrow(() -> new RuntimeException("Employee not found"));

                if (passwordEncoder.matches(rawPassword, employee.getPassword())) {
                    employee.setPassword(null); // 🔒 Security
                    return employee;
                } else {
                    throw new RuntimeException("Invalid Password");
                }
            }
        }

        throw new RuntimeException("Role category not recognized");
    }
}
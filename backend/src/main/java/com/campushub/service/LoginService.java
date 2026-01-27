package com.campushub.service;

import com.campushub.dto.LoginRequest; // ✅ Ensure this is imported
import com.campushub.model.AdminUser;
import com.campushub.model.Employee;
import com.campushub.model.Student;
import com.campushub.repository.AdminUserRepository;
import com.campushub.repository.EmployeeRepository;
import com.campushub.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired private StudentRepository studentRepository;
    @Autowired private EmployeeRepository employeeRepository;
    @Autowired private AdminUserRepository adminUserRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    // ✅ UPDATE THE METHOD SIGNATURE HERE
    public Object loginUser(LoginRequest request) {
        
        // Extract values from the request object
        String role = request.getRole();
        String userId = request.getUserid();
        String rawPassword = request.getPassword();

        // --- 1. STUDENT LOGIN ---
        if ("student".equalsIgnoreCase(role)) {
            Student student = studentRepository.findByAdmissionNo(userId)
                .orElseThrow(() -> new RuntimeException("Invalid Student Credentials"));

            if (passwordEncoder.matches(rawPassword, student.getPassword())) {
                return student;
            } else {
                throw new RuntimeException("Invalid Student Credentials");
            }
        }

        // --- 2. EMPLOYEE / ADMIN LOGIN ---
        else if ("employee".equalsIgnoreCase(role)) {
            String type = request.getType(); 

            // CASE A: Registrar & TPO
            if ("registrar".equalsIgnoreCase(type) || "tpo".equalsIgnoreCase(type)) {
                AdminUser admin = adminUserRepository.findByUserIdAndRole(userId, type)
                    .orElseThrow(() -> new RuntimeException("Invalid " + type + " Credentials"));

                // Note: If your AdminUsers are not hashed yet, use .equals()
                // If they ARE hashed, use passwordEncoder.matches()
                if (passwordEncoder.matches(rawPassword, admin.getPassword())) {
                    return admin;
                } else {
                    throw new RuntimeException("Invalid " + type + " Credentials");
                }
            }

            // CASE B: Regular Employees
            else {
                // Ensure your EmployeeRepository has: findByTypeAndEid(String type, String eid)
                Employee employee = employeeRepository.findByTypeAndEid(type, userId)
                    .orElseThrow(() -> new RuntimeException("Invalid Employee Credentials"));

                if (passwordEncoder.matches(rawPassword, employee.getPassword())) {
                    return employee;
                } else {
                    throw new RuntimeException("Invalid Employee Credentials");
                }
            }
        }

        throw new RuntimeException("Role category not recognized");
    }
}
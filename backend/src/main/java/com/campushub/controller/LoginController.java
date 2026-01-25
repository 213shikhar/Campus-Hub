package com.campushub.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.campushub.dto.LoginRequest;
import com.campushub.model.AdminUser;
import com.campushub.model.Employee;
import com.campushub.model.Student;
import com.campushub.repository.AdminUserRepository;
import com.campushub.repository.EmployeeRepository;
import com.campushub.repository.StudentRepository;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    AdminUserRepository adminUserRepository; // ✅ Inject the new repo

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        
        // 1. STUDENT LOGIN
        if ("student".equalsIgnoreCase(loginRequest.getRole())) {
            Optional<Student> student = studentRepository.findByAdmissionNoAndPassword(
                loginRequest.getUserid(), 
                loginRequest.getPassword()
            );

            if (student.isPresent()) {
                return ResponseEntity.ok(student.get());
            } else {
                return ResponseEntity.status(401).body("Invalid Student Credentials");
            }
        }
        
        // 2. EMPLOYEE / ADMIN LOGIN
        else if ("employee".equalsIgnoreCase(loginRequest.getRole())) {
            
            String type = loginRequest.getType(); // e.g., 'registrar', 'tpo', 'faculty'

            // ✅ CASE A: Special Admin Users (Registrar & TPO)
            // These users are in the 'admin_users' table, not 'employees'
            if ("registrar".equalsIgnoreCase(type) || "tpo".equalsIgnoreCase(type)) {
                
                Optional<AdminUser> admin = adminUserRepository.findByUserIdAndRole(
                    loginRequest.getUserid(), 
                    type 
                );

                // Verify password (plain text as per your current setup)
                if (admin.isPresent() && admin.get().getPassword().equals(loginRequest.getPassword())) {
                    return ResponseEntity.ok(admin.get());
                } else {
                    return ResponseEntity.status(401).body("Invalid " + type + " Credentials");
                }
            }

            // ✅ CASE B: Regular Employees (Faculty, HOD, Exam Controller)
            // These users are in the 'employees' table
            else {
                Optional<Employee> employee = employeeRepository.findByTypeAndEidAndPassword(
                    loginRequest.getType(), 
                    loginRequest.getUserid(), 
                    loginRequest.getPassword()
                );
                
                if (employee.isPresent()) {
                    return ResponseEntity.ok(employee.get());
                } else {
                    return ResponseEntity.status(401).body("Invalid Employee Credentials");
                }
            }
        }
        
        return ResponseEntity.badRequest().body("Role category not recognized");
    }
}
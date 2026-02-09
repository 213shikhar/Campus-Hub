package com.campushub.service;

import com.campushub.dto.LoginRequest;
import com.campushub.model.AdminUser;
import com.campushub.model.Employee;
import com.campushub.model.Student;
import com.campushub.repository.AdminUserRepository;
import com.campushub.repository.EmployeeRepository;
import com.campushub.repository.StudentRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

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
    
 // ✅ Inject Entity Manager to control Hibernate's behavior
    @PersistenceContext
    private EntityManager entityManager;
    
    @Transactional
    public Object loginUser(LoginRequest request) {
        
        String role = request.getRole();
        String userId = request.getUserId();
        String rawPassword = request.getPassword();

        // --- 1. STUDENT LOGIN ---
        if ("student".equalsIgnoreCase(role)) {
            Student student = studentRepository.findByAdmissionNo(userId)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + userId));

            if (passwordEncoder.matches(rawPassword, student.getPassword())) {
                
                // ✅ FIX: Stop watching this object so changes aren't saved to DB
                entityManager.detach(student); 
                
                student.setPassword(null); // Now this only affects the Java object, not the DB
                return student;
            } else {
                throw new RuntimeException("Invalid Password");
            }
        }

        // --- 2. EMPLOYEE / ADMIN LOGIN ---
        else if ("employee".equalsIgnoreCase(role)) {
            String type = request.getType(); 

            // CASE A: Registrar or TPO
            if ("registrar".equalsIgnoreCase(type) || "tpo".equalsIgnoreCase(type)) {
                AdminUser admin = adminUserRepository.findByUserIdAndRole(userId, type)
                    .orElseThrow(() -> new RuntimeException("Admin User not found"));

                if (passwordEncoder.matches(rawPassword, admin.getPassword())) {
                    
                    // ✅ FIX: Detach Admin
                    entityManager.detach(admin);
                    
                    admin.setPassword(null);
                    return admin;
                } else {
                    throw new RuntimeException("Invalid Password");
                }
            }

            // CASE B: Regular Employees
            else {
                Employee employee = employeeRepository.findByTypeAndEid(type, userId)
                    .orElseThrow(() -> new RuntimeException("Employee not found"));

                if (passwordEncoder.matches(rawPassword, employee.getPassword())) {
                    
                    // ✅ FIX: Detach Employee
                    entityManager.detach(employee);
                    
                    employee.setPassword(null);
                    return employee;
                } else {
                    throw new RuntimeException("Invalid Password");
                }
            }
        }

        throw new RuntimeException("Role category not recognized");
    }
}
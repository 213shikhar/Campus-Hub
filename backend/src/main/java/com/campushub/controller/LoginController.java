package com.campushub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.campushub.dto.LoginRequest;
import com.campushub.model.Employee;
import com.campushub.model.Student;
import com.campushub.repository.EmployeeRepository;
import com.campushub.repository.StudentRepository;

@RestController
@RequestMapping("/api")
public class LoginController {
	
	@Autowired
	StudentRepository studentRepository;
	
	@Autowired
	EmployeeRepository employeeRepository;
	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
		// 1. Check if the role is STUDENT
        if ("student".equalsIgnoreCase(loginRequest.getRole())) {
            // Check database for matching Admission No and Password
            Student student = studentRepository.findByAdmissionNoAndPassword(loginRequest.getUserid(), loginRequest.getPassword());
            if (student != null) {
                // User found! Return the student object (contains name, email, etc.)
                return ResponseEntity.ok(student);
            } 
            else {
                return ResponseEntity.status(401).body("Invalid Student Credentials");
            }
        }
        
        else if ("employee".equalsIgnoreCase(loginRequest.getRole())) {
            Employee employee = employeeRepository.findByEidAndPassword(loginRequest.getUserid(), loginRequest.getPassword());
            if (employee != null) {
                return ResponseEntity.ok(employee);
            } 
            else {
                return ResponseEntity.status(401).body("Invalid Employee Credentials");
            }
        }
        
        // 2. Check if the role is ADMIN (Example placeholder)
        else if ("admin".equalsIgnoreCase(loginRequest.getRole())) {
            // Add AdminRepository logic here later
            return ResponseEntity.status(401).body("Admin login not implemented yet");
        }

        return ResponseEntity.badRequest().body("Role not recognized");
	}
}

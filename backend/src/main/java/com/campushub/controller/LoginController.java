package com.campushub.controller;

import java.util.Optional;

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
    // @Autowired
    // ParentRepository parentRepository; // You will need this later
	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
		
        // student login
        if ("student".equalsIgnoreCase(loginRequest.getRole())) {
            Optional<Student> student = studentRepository.findByAdmissionNoAndPassword(loginRequest.getUserid(), loginRequest.getPassword());
            // Fix: Use .isPresent() for Optional, not != null
            if (student.isPresent()) {
                return ResponseEntity.ok(student.get());
            } else {
                return ResponseEntity.status(401).body("Invalid Student Credentials");
            }
        }
        
        // 2. EMPLOYEE LOGIN (Faculty, HOD, Registrar, Exam Controller)
        // We check 'role' (which is 'employee') to enter this block
        else if ("employee".equalsIgnoreCase(loginRequest.getRole())) {
            
            // We use 'type' (e.g., 'faculty', 'hod') to query the DB
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

        // 3. PARENT LOGIN (Placeholder)
        else if ("parent".equalsIgnoreCase(loginRequest.getRole())) {
            // Optional<Parent> parent = parentRepository.findBy...
            return ResponseEntity.status(503).body("Parent login logic not implemented yet in Controller");
        }
        
        return ResponseEntity.badRequest().body("Role category not recognized");
	}
}

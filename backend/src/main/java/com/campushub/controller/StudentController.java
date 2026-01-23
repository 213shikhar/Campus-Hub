package com.campushub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.campushub.model.Student;
import com.campushub.service.StudentService;

@RestController
@RequestMapping("api/students")
@CrossOrigin(origins = "http://localhost:3000") // Ensure CORS is enabled for React
public class StudentController {
    
    @Autowired
    private StudentService studentService;
    
    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registerStudent(@RequestBody Student student) {
        
        try {
            // 2. Call Service
            Student savedStudent = studentService.registerStudent(student);

            // 3. CRITICAL: Check if service actually returned a student
            if (savedStudent != null) {
                return ResponseEntity.ok(savedStudent);
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                     .body("Registration failed: Service returned null");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error registering student: " + e.getMessage());
        }
    }
}
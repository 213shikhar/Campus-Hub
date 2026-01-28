package com.campushub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.campushub.dto.ChangePasswordRequest;
import com.campushub.dto.StudentProfileDTO;
import com.campushub.dto.StudentRequest;
import com.campushub.model.Student;
import com.campushub.repository.StudentRepository;
import com.campushub.service.StudentService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;
    @Autowired private StudentRepository studentRepository;

    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registerStudent(@Valid @RequestBody StudentRequest request) {
        
        // ✅ 1. Check for Duplicate Admission No
        if (studentRepository.existsByAdmissionNo(request.getAdmissionNo())) {
            return ResponseEntity
                .badRequest()
                .body("Error: Admission Number " + request.getAdmissionNo() + " already exists!");
        }

        // 3. Proceed if no duplicates found
        Student savedStudent = studentService.registerStudent(request);
        return ResponseEntity.ok(savedStudent);
    }
    
 // 1. GET Profile Endpoint
    @GetMapping("/profile/{admissionNo}")
    public ResponseEntity<StudentProfileDTO> getStudentProfile(@PathVariable String admissionNo) {
        StudentProfileDTO profile = studentService.getStudentProfile(admissionNo);
        return ResponseEntity.ok(profile);
    }
    
 // 2. UPDATE Profile Endpoint
    @PutMapping("/profile/{admissionNo}")
    public ResponseEntity<String> updateStudentProfile(
            @PathVariable String admissionNo, 
            @Valid @RequestBody StudentProfileDTO studentProfileDTO // ✅ Added @Valid
    ) {
        studentService.updateStudentInfo(admissionNo, studentProfileDTO);
        return ResponseEntity.ok("Profile updated successfully");
    }
    
    @PostMapping("/change-password/{admissionNo}")
    public ResponseEntity<String> changePassword(@PathVariable String admissionNo, @RequestBody ChangePasswordRequest request) {
        boolean success = studentService.changePassword(admissionNo, request);
        if (success) {
            return ResponseEntity.ok("Password changed successfully");
        } else {
            return ResponseEntity.status(400).body("Incorrect old password");
        }
    }
}
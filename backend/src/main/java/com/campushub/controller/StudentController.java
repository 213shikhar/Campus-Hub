package com.campushub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.campushub.dto.ChangePasswordRequest;
import com.campushub.dto.StudentProfileDTO;
import com.campushub.dto.StudentRequest;
import com.campushub.model.Student;
import com.campushub.repository.StudentRepository;
import com.campushub.service.StudentService;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/students")
@CrossOrigin(origins = "http://localhost:3000") // Ensure CORS is enabled here too
public class StudentController {

    @Autowired private StudentService studentService;
    @Autowired private StudentRepository studentRepository;

    // ✅ 1. REGISTER Endpoint
    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> registerStudent(
            @RequestPart("student") String studentString, // JSON sent as String
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        try {
            // Convert JSON String to Object
            ObjectMapper mapper = new ObjectMapper();
            StudentRequest request = mapper.readValue(studentString, StudentRequest.class);

            // Check Duplicate
            if (studentRepository.existsByAdmissionNo(request.getAdmissionNo())) {
                return ResponseEntity
                    .badRequest()
                    .body("Error: Admission Number " + request.getAdmissionNo() + " already exists!");
            }
            
            // Validate Image
            if (image != null && image.getSize() > 1048576) {
                return ResponseEntity.badRequest().body("Error: Image size exceeds 1MB");
            }

            // Call Service
            Student savedStudent = studentService.registerStudent(request, image);
            return ResponseEntity.ok(savedStudent);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Registration Error: " + e.getMessage());
        }
    }
    
    // ✅ 2. GET Profile Endpoint (Fixes 403/LOB Error)
    @GetMapping("/profile/{admissionNo}")
    public ResponseEntity<StudentProfileDTO> getStudentProfile(@PathVariable String admissionNo) {
        // Calls Service (which is @Transactional), so Image loads correctly
        StudentProfileDTO profile = studentService.getStudentProfile(admissionNo);
        return ResponseEntity.ok(profile);
    }
    
    // ✅ 3. UPDATE Profile Endpoint
    @PutMapping("/profile/{admissionNo}")
    public ResponseEntity<String> updateStudentProfile(
            @PathVariable String admissionNo, 
            @Valid @RequestBody StudentProfileDTO studentProfileDTO
    ) {
        studentService.updateStudentInfo(admissionNo, studentProfileDTO);
        return ResponseEntity.ok("Profile updated successfully");
    }
    
    // ✅ 4. CHANGE PASSWORD Endpoint
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
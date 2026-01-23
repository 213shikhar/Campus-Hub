package com.campushub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.campushub.dto.StudentRequest;
import com.campushub.model.Student;
import com.campushub.service.StudentService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registerStudent(
            @Valid @RequestBody StudentRequest request) {

        Student savedStudent = studentService.registerStudent(request);
        return ResponseEntity.ok(savedStudent);
    }
}
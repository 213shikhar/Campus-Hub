package com.campushub.controller;

import com.campushub.model.*;
import com.campushub.service.RegistrarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/registrar")
@CrossOrigin(origins = "http://localhost:3000")
public class RegistrarController {

    @Autowired
    private RegistrarService registrarService;

    // --- Courses ---
    @PostMapping("/course/add")
    public ResponseEntity<?> addCourse(@RequestBody Course course) {
        return ResponseEntity.ok(registrarService.addCourse(course));
    }
    @GetMapping("/courses")
    public List<Course> getCourses() { return registrarService.getAllCourses(); }

    // --- Departments ---
    @PostMapping("/dept/add")
    public ResponseEntity<?> addDept(@RequestBody Department dept) {
        return ResponseEntity.ok(registrarService.addDepartment(dept));
    }
    @GetMapping("/departments")
    public List<Department> getDepts() { return registrarService.getAllDepartments(); }

    // --- Subjects ---
    @PostMapping("/subject/add")
    public ResponseEntity<?> addSubject(@RequestBody Subject subject) {
        return ResponseEntity.ok(registrarService.addSubject(subject));
    }
    @GetMapping("/subjects")
    public List<Subject> getSubjects() { return registrarService.getAllSubjects(); }

    // --- Update Semester ---
    @PutMapping("/promote/{admissionNo}")
    public ResponseEntity<?> promoteStudent(@PathVariable String admissionNo) {
        registrarService.promoteStudent(admissionNo);
        return ResponseEntity.ok("Student promoted to next semester.");
    }

    // --- View All Data ---
    @GetMapping("/students")
    public List<Student> getAllStudents() {
        return registrarService.getAllStudents();
    }

    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return registrarService.getAllEmployees();
    }

    @GetMapping("/feedbacks")
    public List<Feedback> getAllFeedbacks() {
        return registrarService.getAllFeedbacks();
    }
}
package com.campushub.controller;

import com.campushub.model.*;
import com.campushub.repository.EmployeeInfoRepository;
import com.campushub.repository.EmployeeRepository;
import com.campushub.repository.StudentInfoRepository;
import com.campushub.repository.StudentRepository;
import com.campushub.repository.SubjectRepository;
import com.campushub.service.RegistrarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/registrar")
@CrossOrigin(origins = "http://localhost:3000")
public class RegistrarController {

    @Autowired private RegistrarService registrarService;
    @Autowired private StudentRepository studentRepository;
    @Autowired private StudentInfoRepository studentInfoRepository;
    @Autowired private EmployeeRepository employeeRepository;
    @Autowired private EmployeeInfoRepository employeeInfoRepository;
    @Autowired private SubjectRepository subjectRepository; // Ensure this is autowired

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
    
 // --- DELETE Subject End point ---
    @DeleteMapping("/subject/delete/{id}")
    public ResponseEntity<?> deleteSubject(@PathVariable Long id) {
        if (!subjectRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        subjectRepository.deleteById(id);
        return ResponseEntity.ok("Subject deleted successfully");
    }

    // --- Update Semester ---
    @PutMapping("/promote/{admissionNo}")
    public ResponseEntity<?> promoteStudent(@PathVariable String admissionNo) {
        registrarService.promoteStudent(admissionNo);
        return ResponseEntity.ok("Student promoted to next semester.");
    }

    
    // --- 1. FILTERED Students Endpoint ---
    @GetMapping("/students")
    public List<Student> getStudents(
            @RequestParam(required = false) String course,
            @RequestParam(required = false) String branch) {
        
        if (course != null && branch != null) {
            return studentRepository.findByCourseAndBranch(course, branch);
        } else {
            return studentRepository.findAll();
        }
    }
 // --- 2. FILTERED Employees Endpoint ---
    @GetMapping("/employees")
    public List<Employee> getEmployees(@RequestParam(required = false) String dept) {
        if (dept != null && !dept.isEmpty()) {
            return employeeRepository.findByDepartment(dept);
        } else {
            return employeeRepository.findAll();
        }
    }

 // --- 3. DELETE Student Endpoint (UPDATED) ---
    @DeleteMapping("/student/delete/{admissionNo}")
    public ResponseEntity<?> deleteStudent(@PathVariable String admissionNo) {
        
        // 1. Verify Student Exists
        Student student = studentRepository.findByAdmissionNo(admissionNo)
            .orElseThrow(() -> new RuntimeException("Student not found"));
        
        // 2. ✅ FIRST: Delete the linked profile info (The Child)
        // This prevents the foreign key constraint error.
        studentInfoRepository.deleteByStudent_AdmissionNo(admissionNo);

        // 3. ✅ SECOND: Delete the main student record (The Parent)
        studentRepository.delete(student);
        
        return ResponseEntity.ok("Student and their profile deleted successfully");
    }

 // --- 4. DELETE Employee Endpoint (UPDATED) ---
    @DeleteMapping("/employee/delete/{eid}")
    public ResponseEntity<?> deleteEmployee(@PathVariable String eid) {
        
        // 1. Check if employee exists
        Employee emp = employeeRepository.findByEid(eid)
            .orElseThrow(() -> new RuntimeException("Employee not found"));
        
        // 2. ✅ FIRST: Delete the detailed profile info (The Child)
        employeeInfoRepository.deleteByEmployee_Eid(eid);

        // 3. ✅ SECOND: Delete the main employee record (The Parent)
        employeeRepository.delete(emp);
        
        return ResponseEntity.ok("Employee and deleted successfully");
    }

    @GetMapping("/feedbacks")
    public List<Feedback> getAllFeedbacks() {
        return registrarService.getAllFeedbacks();
    }
}
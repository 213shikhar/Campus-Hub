package com.campushub.service;

import com.campushub.model.*;
import com.campushub.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RegistrarService {

    @Autowired private CourseRepository courseRepository;
    @Autowired private DepartmentRepository deptRepository;
    @Autowired private SubjectRepository subjectRepository;
    @Autowired private StudentRepository studentRepository;
    @Autowired private EmployeeRepository employeeRepository;
    @Autowired private FeedbackRepository feedbackRepository;

    // --- 1. Course Management ---
    public Course addCourse(Course course) {
        return courseRepository.save(course);
    }
    public List<Course> getAllCourses() { return courseRepository.findAll(); }

    // --- 2. Department Management ---
    public Department addDepartment(Department dept) {
        return deptRepository.save(dept);
    }
    public List<Department> getAllDepartments() { return deptRepository.findAll(); }

    // --- 3. Subject Management ---
    public Subject addSubject(Subject subject) {
        return subjectRepository.save(subject);
    }
    public List<Subject> getAllSubjects() { return subjectRepository.findAll(); }

    // --- 4. Update Semester (Bulk or Single) ---
    // Promotes a student to the next semester
    public void promoteStudent(String admissionNo) {
        Student student = studentRepository.findByAdmissionNo(admissionNo)
            .orElseThrow(() -> new RuntimeException("Student not found"));
        
        student.setSemester(student.getSemester() + 1);
        studentRepository.save(student);
    }

    // --- 5. View Data ---
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }
}
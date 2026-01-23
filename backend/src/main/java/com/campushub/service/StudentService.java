package com.campushub.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.campushub.dto.StudentRequest;
import com.campushub.model.Student;
import com.campushub.repository.StudentRepository;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public Student registerStudent(StudentRequest request) {

        Student student = new Student();
        student.setSession(request.getSession());
        student.setCourse(request.getCourse());
        student.setBranch(request.getBranch());
        student.setAdmissionNo(request.getAdmissionNo());
        student.setStudentname(request.getStudentname());
        student.setMobile(request.getMobile());
        student.setEmail(request.getEmail());
        student.setAddress(request.getAddress());

        // Password hashing SHOULD be done here
        student.setPassword(request.getPassword());

        return studentRepository.save(student);
    }
}

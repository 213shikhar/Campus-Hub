package com.campushub.service;

import org.springframework.stereotype.Service;

import com.campushub.model.Student;
import com.campushub.repository.StudentRepository;

@Service
public class StudentService {
	
	private StudentRepository studentRepository;
	
	public Student registerStudent(Student student) {
		return studentRepository.save(student);
	}
}

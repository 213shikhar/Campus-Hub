package com.campushub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.campushub.model.Student;
import com.campushub.service.StudentService;

@RestController
@RequestMapping("api/students")
public class StudentController {
	
	@Autowired
	private StudentService studentService;
	
	@PostMapping("/register")
	public String registerStudent(@RequestBody Student student) {
		studentService.registerStudent(student);
		return "Student registered successfully";
	}
}

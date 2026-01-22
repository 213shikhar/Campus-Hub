package com.campushub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.campushub.model.Employee;
import com.campushub.service.EmployeeService;

@RestController
@RequestMapping("api/employees")
public class EmployeeController {
	
	@Autowired
	private EmployeeService employeeService;
	
	@PostMapping("/register")
	public String registerEmployee(@RequestBody Employee employee) {
		employeeService.registerEmployee(employee);
		return "Employee registered successfully";
	}
}
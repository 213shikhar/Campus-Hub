package com.campushub.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.campushub.model.Employee;
import com.campushub.repository.EmployeeRepository;

@Service
public class EmployeeService {
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	public Employee registerEmployee(Employee employee) {
		return employeeRepository.save(employee);
	}
}

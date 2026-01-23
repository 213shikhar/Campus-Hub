package com.campushub.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.campushub.dto.EmployeeRequest;
import com.campushub.model.Employee;
import com.campushub.repository.EmployeeRepository;

@Service
public class EmployeeService {
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	public Employee registerEmployee(EmployeeRequest request) {
		Employee employee = new Employee();
		employee.setType(request.getType());
		employee.setCourse(request.getCourse());
		employee.setDepartment(request.getDepartment());
		employee.setEid(request.getEid());
		employee.setEmployeeName(request.getEmployeeName());
        employee.setMobile(request.getMobile());
        employee.setEmail(request.getEmail());
        
        // Password hashing SHOULD be done here
        employee.setPassword(request.getPassword());
        
		return employeeRepository.save(employee);
	}
}

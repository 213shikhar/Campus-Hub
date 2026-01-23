package com.campushub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.campushub.dto.EmployeeRequest;
import com.campushub.model.Employee;
import com.campushub.service.EmployeeService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("api/employees")
public class EmployeeController {
	
	@Autowired
	private EmployeeService employeeService;
	
	@PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registerEmployee(
            @Valid @RequestBody EmployeeRequest request) {

        Employee savedEmployee = employeeService.registerEmployee(request);
        return ResponseEntity.ok(savedEmployee);
    }
}
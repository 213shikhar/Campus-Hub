package com.campushub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.campushub.dto.ChangePasswordRequest;
import com.campushub.dto.EmployeeProfileDTO;
import com.campushub.dto.EmployeeRequest;
import com.campushub.model.Employee;
import com.campushub.repository.EmployeeRepository;
import com.campushub.service.EmployeeService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("api/employees")
public class EmployeeController {
	
	@Autowired
	private EmployeeService employeeService;
	@Autowired EmployeeRepository employeeRepository;
	
	@PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> registerEmployee(@Valid @RequestBody EmployeeRequest request) {

	    // ✅ 1. Check for Duplicate Employee ID
	    if (employeeRepository.existsByEid(request.getEid())) {
	        return ResponseEntity
	            .badRequest()
	            .body("Error: Employee ID " + request.getEid() + " already exists!");
	    }

	    // 3. Proceed
	    Employee savedEmployee = employeeService.registerEmployee(request);
	    return ResponseEntity.ok(savedEmployee);
	}
	
	// ✅ New: Get Profile
    @GetMapping("/profile/{eid}")
    public ResponseEntity<EmployeeProfileDTO> getEmployeeProfile(@PathVariable String eid) {
        EmployeeProfileDTO profile = employeeService.getEmployeeProfile(eid);
        return ResponseEntity.ok(profile);
    }

    // ✅ New: Update Profile
    @PutMapping("/profile/{eid}")
    public ResponseEntity<String> updateEmployeeProfile(@PathVariable String eid, @RequestBody EmployeeProfileDTO dto) {
        employeeService.updateEmployeeInfo(eid, dto);
        return ResponseEntity.ok("Profile updated successfully");
    }
    
    @PostMapping("/change-password/{eid}")
    public ResponseEntity<String> changePassword(@PathVariable String eid, @RequestBody ChangePasswordRequest request) {
        boolean success = employeeService.changePassword(eid, request);
        if (success) {
            return ResponseEntity.ok("Password changed successfully");
        } else {
            return ResponseEntity.status(400).body("Incorrect old password");
        }
    }
}
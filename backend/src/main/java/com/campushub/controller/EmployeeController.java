package com.campushub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.databind.ObjectMapper; // ✅ Needed for manual JSON parsing

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
    
    @Autowired private EmployeeService employeeService;
    @Autowired private EmployeeRepository employeeRepository;
    
    // ✅ UPDATED: Now consumes MULTIPART_FORM_DATA to handle Image + JSON
    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> registerEmployee(
            @RequestPart("employee") String employeeString, // JSON sent as String
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        try {
        	System.out.println("RAW JSON RECEIVED: " + employeeString);
            
        	// 1. Manually Convert JSON String to EmployeeRequest Object
            ObjectMapper mapper = new ObjectMapper();
            EmployeeRequest request = mapper.readValue(employeeString, EmployeeRequest.class);
            
            System.out.println("MAPPED PASSWORD: " + request.getPassword());
            // 2. Check for Duplicate Employee ID
            if (employeeRepository.existsByEid(request.getEid())) {
                return ResponseEntity
                    .badRequest()
                    .body("Error: Employee ID " + request.getEid() + " already exists!");
            }
            
            // 3. Validate Image Size (Optional: Max 1MB)
            if (image != null && image.getSize() > 1048576) {
                return ResponseEntity.badRequest().body("Error: Image size exceeds 1MB");
            }

            // 4. Call Service with Image
            Employee savedEmployee = employeeService.registerEmployee(request, image);
            return ResponseEntity.ok(savedEmployee);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Registration Error: " + e.getMessage());
        }
    }
    
    // ✅ Get Profile
    @GetMapping("/profile/{eid}")
    public ResponseEntity<EmployeeProfileDTO> getEmployeeProfile(@PathVariable String eid) {
        EmployeeProfileDTO profile = employeeService.getEmployeeProfile(eid);
        return ResponseEntity.ok(profile);
    }

    // ✅ Update Profile (Stays as JSON since we update text fields here usually)
    // If you want to update the image separately, create a separate endpoint for it.
    @PutMapping("/profile/{eid}")
    public ResponseEntity<String> updateEmployeeProfile(
            @PathVariable String eid, 
            @Valid @RequestBody EmployeeProfileDTO employeeProfileDTO
    ) {
        employeeService.updateEmployeeInfo(eid, employeeProfileDTO);
        return ResponseEntity.ok("Profile updated successfully");
    }
    
    // ✅ Change Password
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
package com.campushub.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class EmployeeProfileDTO {
	
    private String employeeName;
    private String eid;
    private String department;
    private String course;
    private String type; // Role
    private String email;
    private String mobile;

    @NotBlank(message = "Date of Birth is required")
    private String dob;

    private String gender;
    private String category;
    private String address;

    @NotBlank(message = "Qualification is required")
    private String qualification;

    @NotBlank(message = "Experience is required")
    private String experience;

    @Pattern(regexp = "^$|^\\d{12}$", message = "Adhaar must be exactly 12 digits")
    private String adhaarCardNo;

    @Pattern(regexp = "^[A-Z]{5}[0-9]{4}[A-Z]{1}$", message = "Invalid PAN Card format (e.g., ABCDE1234F)")
    private String panCardNo;
    
    // to be added later
    private String fatherName;
    private String motherName;
    private String spouseName;
    private String photoUrl;
}

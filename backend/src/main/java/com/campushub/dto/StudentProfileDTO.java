package com.campushub.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class StudentProfileDTO {
	// Core Data (From Student Table) - Read Only on Frontend
    private String studentName;
    private String admissionNo;
    private String branch;
    private String course;
    private String session;
    private String email;
    private String mobile;
    private String address;
    
 // --- Extended Data (Editable) with Validation ---
    private Integer semester;

    @NotBlank(message = "Date of Birth is required")
    private String dob;

    @NotBlank(message = "Gender is required")
    private String gender;

    @NotBlank(message = "Category is required")
    private String category;

    // Optional but strict if provided (allows empty string OR 12 digits)
    // Regex explanation: ^$ matches empty string, | matches OR, ^\d{12}$ matches 12 digits
    @Pattern(regexp = "^$|^\\d{12}$", message = "Adhaar must be exactly 12 digits")
    private String adhaarCardNo;
    
    // --- Parents ---
    
    @NotBlank(message = "Father's Name is required")
    private String fatherName;
    
    private String fatherOccupation;
    private String fatherQualification;

    @Pattern(regexp = "^$|^\\d{10}$", message = "Father's Mobile must be 10 digits")
    private String fatherMobile;
    
    private String fatherEmail;
    private String fatherAdhaar;

    @NotBlank(message = "Mother's Name is required")
    private String motherName; 
    
    private String motherOccupation;
    private String motherQualification;

    @Pattern(regexp = "^$|^\\d{10}$", message = "Mother's Mobile must be 10 digits")
    private String motherMobile;
    
    private String motherEmail;
    private String motherAdhaar;
    
    // --- Guardian (Optional) ---
    private String guardianName;
    private String guardianRelation;
    private String guardianAddress;

    // Optional: Only validate if not empty
    @Pattern(regexp = "^$|^\\d{10}$", message = "Guardian Mobile must be 10 digits")
    private String guardianMobile;

    // URLs
    private String photoUrl;
    private String signatureUrl;
    private String tenthMarksheetUrl;
    private String twelfthMarksheetUrl;
}

package com.campushub.dto;
import lombok.Data;

@Data
public class EmployeeProfileDTO {
	// Core Data (Read Only)
    private String employeeName;
    private String eid;
    private String department;
    private String course;
    private String type; // Role
    private String email;
    private String mobile;

    // Extended Data (Editable)
    private String dob;
    private String gender;
    private String category;
    private String address;
    private String qualification;
    private String experience;
    private String adhaarCardNo;
    private String panCardNo;
    
    private String fatherName;
    private String motherName;
    private String spouseName;
    private String photoUrl;
}

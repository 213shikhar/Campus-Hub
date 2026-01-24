package com.campushub.dto;

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
    
 // Extended Data (From StudentInfo Table) - Editable
    private String dob;
    private String gender;
    private String category;
    private String adhaarCardNo;
    
    private String fatherName;
    private String fatherOccupation;
    private String fatherQualification;
    private String fatherMobile;
    private String fatherEmail;
    private String fatherAdhaar;

    private String motherName; 
    private String motherOccupation;
    private String motherQualification;
    private String motherMobile;
    private String motherEmail;
    private String motherAdhaar;
    
    private String guardianName;
    private String guardianRelation;
    private String guardianAddress;
    private String guardianMobile;

    private String photoUrl;
    private String signatureUrl;
    private String tenthMarksheetUrl;
    private String twelfthMarksheetUrl;
}

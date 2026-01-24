package com.campushub.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "student_info")
public class StudentInfo {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    // This connects StudentInfo to the main Student table
    @OneToOne
    @JoinColumn(name = "admission_no", referencedColumnName = "admission_no") 
    private Student student;

    // Personal Details
    private String dob;
    private String gender;
    private String category;
    private String adhaarCardNo;

    // Father's Details
    private String fatherName;
    private String fatherOccupation;
    private String fatherQualification;
    private String fatherMobile;
    private String fatherEmail;
    private String fatherAdhaar;

    // Mother's Details
    private String motherName; 
    private String motherOccupation;
    private String motherQualification;
    private String motherMobile;
    private String motherEmail;
    private String motherAdhaar;
    
//    Guardian's Details
    private String guardianName;
    private String guardianRelation;
    private String guardianAddress;
    private String guardianMobile;

    // Documents (Store the URL/Path to the file, not the file itself)
    private String photoUrl;
    private String signatureUrl;
    private String tenthMarksheetUrl;
    private String twelfthMarksheetUrl;
}

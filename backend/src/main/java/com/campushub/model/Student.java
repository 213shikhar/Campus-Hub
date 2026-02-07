package com.campushub.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "students")
public class Student {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
    // Academic Details
	private String session;
	private String course;
    private String branch;
    private Integer semester; // ✅ Added based on previous fixes
    private String section;   // ✅ Added (was missing, but used in Frontend)

    // Unique Identifier
    // This tells the DB: "No two students can have the same Admission Number"
    @Column(name = "admission_no", unique = true, nullable = false)
    private String admissionNo;
    
    // Personal Details
    private String studentname;
    private String mobile;
    private String email;
    private String address;
    private String password;

    // ✅ NEW: Profile Image Storage
    // @Lob tells Database this is a Large Object (BLOB)
    // length = 1000000 is approx 1MB limit
    @Lob
    @Column(length = 1000000)
    private byte[] profileImage;
}
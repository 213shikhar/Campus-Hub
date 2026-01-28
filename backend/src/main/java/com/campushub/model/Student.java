package com.campushub.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
	private String session;
	private String course;
    private String branch;
 // ✅ FIX: Add 'unique = true' and 'nullable = false'
    // This tells the DB: "No two students can have the same Admission Number"
    // Now it can be used as a Foreign Key reference.
    @Column(name = "admission_no", unique = true, nullable = false)
    private String admissionNo;
    private String studentname;
    private String mobile;
    private String email;
    private String address;
    private String password;
 // inside com.campushub.model.Student
    @Column(nullable = false, columnDefinition = "integer default 1")
 // ✅ ADD THIS FIELD
    private Integer semester;
 // ✅ FIX: Add 'columnDefinition' to set a default value for existing rows
    @Column(nullable = false, columnDefinition = "boolean default false")
    private boolean isPlaced = false;
    private String companyName;
    private String packageLPA; // e.g., "12 LPA"
}
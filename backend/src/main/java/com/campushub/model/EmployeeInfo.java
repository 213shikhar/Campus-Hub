package com.campushub.model;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "employee_info")
public class EmployeeInfo {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    // Link to Core Employee Table
    @OneToOne
    @JoinColumn(name = "eid", referencedColumnName = "eid") 
    private Employee employee;

    // Personal Details
    private String dob;
    private String gender;
    private String category;
    private String adhaarCardNo;
    private String panCardNo; // Extra field relevant for employees
    private String qualification;
    private String experience;
    private String address;

    // Family Details
    private String fatherName;
    private String motherName;
    private String spouseName; // Relevant for employees

    // Documents
    private String photoUrl;
}

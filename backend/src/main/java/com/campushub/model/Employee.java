package com.campushub.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    private String type; // e.g., Faculty, HOD
    private String course;
    private String department;
    
    // ✅ FIX: Mark eid as Unique to link with EmployeeInfo
    @Column(unique = true, nullable = false)
    private String eid;
    
    private String employeeName;
    private String mobile;
    private String email;
    private String password;
}
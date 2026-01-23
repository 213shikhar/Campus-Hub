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
    // Mapping JSON 'admissionNo' to this field
    @Column(name = "admission_no")
    private String admissionNo;
    private String studentname;
    private String mobile;
    private String email;
    private String address;
    private String password;
}
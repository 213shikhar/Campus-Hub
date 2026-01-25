package com.campushub.model;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "subjects")
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subjectName;
    private String subjectCode;
    private int semester; // e.g., 3 (3rd semester subject)

    // Links
    private String courseName; // B.Tech
    private String branchName; // CSE
}
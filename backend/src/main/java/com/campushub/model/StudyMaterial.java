package com.campushub.model;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "study_material")
public class StudyMaterial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    // File Info
    private String fileName;
    private String contentType; // e.g., "application/pdf"
    
    @Lob // Large Object for storing file data
    @Column(length = 10000000) // Allow up to ~10MB
    private byte[] data;

    // Meta Data
    private String uploadedBy; // Faculty Name
    private LocalDateTime uploadTime;

    // Target Audience (Who can see this?)
    private String course;
    private String branch;
    private Integer semester;
    private String section; // Optional: If null, visible to all sections
}
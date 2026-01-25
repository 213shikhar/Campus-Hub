package com.campushub.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "placement_notices")
public class PlacementNotice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String fileName;
    private String fileType;

    @Lob
    // Remove the columnDefinition entirely. 
    // Hibernate will automatically use 'OID' or 'BYTEA' for PostgreSQL.
       @Column(length = 10000000) 
       private byte[] data;

    private LocalDate uploadDate;

    @PrePersist
    protected void onCreate() {
        uploadDate = LocalDate.now();
    }
}
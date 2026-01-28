package com.campushub.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@Table(name = "exam_schedule")
public class ExamSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String course;
    private String branch;
    private int semester;

    private String subjectName;
    private String subjectCode;

    private LocalDate examDate;
    private LocalTime startTime;
    private LocalTime endTime; // Optional, can just use duration
}
package com.campushub.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "timetable")
public class TimeTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Context (Who is this for?)
    private String course;       // e.g., B.Tech
    private String branch;       // e.g., CSE
    private Integer semester;    // e.g., 6
    private String section;      // e.g., A

    // Timing (When is it?)
    private String dayOfWeek;    // e.g., Monday, Tuesday
    private String timeSlot;     // e.g., 10:00-11:00

    // Details (What & Who?)
    private String subjectCode;  // e.g., CS101
    private String subjectName;  // e.g., Data Structures

    // Link to Faculty (Employee Table)
    private String facultyId;    // e.g., EMP101
    private String facultyName;  // e.g., Dr. Sharma

    // Optional: Room Number
    private String roomNo;       // e.g., Lab-2 or Room-304
}
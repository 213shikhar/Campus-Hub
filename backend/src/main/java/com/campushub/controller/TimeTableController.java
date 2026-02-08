package com.campushub.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.campushub.model.TimeTable;
import com.campushub.service.TimeTableService;

@RestController
@RequestMapping("/api/timetable")
@CrossOrigin(origins = "http://localhost:3000")
public class TimeTableController {

    @Autowired
    private TimeTableService timeTableService;

    // 1. Add Entry (HOD Only)
    @PostMapping("/add")
    public ResponseEntity<?> addEntry(@RequestBody TimeTable entry) {
        try {
            return ResponseEntity.ok(timeTableService.addTimeTableEntry(entry));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 2. Get Student Schedule
    @GetMapping("/student")
    public List<TimeTable> getStudentTimeTable(
            @RequestParam String course,
            @RequestParam String branch,
            @RequestParam Integer semester,
            @RequestParam String section) {
        return timeTableService.getStudentTimetable(course, branch, semester, section);
    }

    // 3. Get Faculty Schedule
    @GetMapping("/faculty/{facultyId}")
    public List<TimeTable> getFacultyTimeTable(@PathVariable String facultyId) {
        return timeTableService.getFacultyTimetable(facultyId);
    }
    
    // 4. Delete Entry
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEntry(@PathVariable Long id) {
        timeTableService.deleteEntry(id);
        return ResponseEntity.ok("Entry deleted");
    }
}
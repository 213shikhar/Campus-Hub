package com.campushub.controller;

import com.campushub.model.ExamSchedule;
import com.campushub.repository.ExamScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exam")
@CrossOrigin(origins = "http://localhost:3000")
public class ExamController {

    @Autowired private ExamScheduleRepository examScheduleRepository;

    // 1. Add Exam (For Exam Controller)
    @PostMapping("/schedule/add")
    public ResponseEntity<?> addExam(@RequestBody ExamSchedule exam) {
        examScheduleRepository.save(exam);
        return ResponseEntity.ok("Exam Scheduled Successfully");
    }

    // 2. View Schedule (For Students)
    @GetMapping("/schedule/view")
    public List<ExamSchedule> getSchedule(
            @RequestParam String course,
            @RequestParam String branch,
            @RequestParam int semester) {
        return examScheduleRepository.findByCourseAndBranchAndSemesterOrderByExamDateAsc(course, branch, semester);
    }
    
    // 3. Delete Schedule (Optional, for corrections)
    @DeleteMapping("/schedule/delete/{id}")
    public ResponseEntity<?> deleteExam(@PathVariable Long id) {
        examScheduleRepository.deleteById(id);
        return ResponseEntity.ok("Deleted");
    }
}
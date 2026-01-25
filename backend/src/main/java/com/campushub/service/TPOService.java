package com.campushub.service;

import com.campushub.model.*;
import com.campushub.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.*;

@Service
public class TPOService {

    @Autowired private PlacementNoticeRepository noticeRepository;
    @Autowired private StudentRepository studentRepository;
    @Autowired private CourseRepository courseRepository; // To get duration

    // --- 1. Notice Management ---
    public PlacementNotice uploadNotice(String title, MultipartFile file) throws IOException {
        PlacementNotice notice = new PlacementNotice();
        notice.setTitle(title);
        notice.setFileName(file.getOriginalFilename());
        notice.setFileType(file.getContentType());
        notice.setData(file.getBytes());
        return noticeRepository.save(notice);
    }

    public List<PlacementNotice> getAllNotices() { return noticeRepository.findAll(); }

    public PlacementNotice getNoticeById(Long id) {
        return noticeRepository.findById(id).orElseThrow(() -> new RuntimeException("File not found"));
    }

    // --- 2. Batch List (Final & Pre-Final Year) ---
    public List<Student> getBatchStudents() {
        List<Student> eligibleStudents = new ArrayList<>();
        List<Course> courses = courseRepository.findAll();

        for (Course course : courses) {
            int duration = course.getDurationYears();
            int finalSem = duration * 2;       // e.g., 4 years * 2 = 8th sem
            int preFinalSem = finalSem - 1;    // 7th sem

            // Fetch students for this course in these specific semesters
            List<Student> students = studentRepository.findByCourseAndSemesterIn(
                course.getCourseName(), 
                Arrays.asList(finalSem, preFinalSem)
            );
            eligibleStudents.addAll(students);
        }
        return eligibleStudents;
    }

    // --- 3. Placement Record ---
    public List<Student> getPlacedStudents() {
        return studentRepository.findByIsPlacedTrue();
    }
}
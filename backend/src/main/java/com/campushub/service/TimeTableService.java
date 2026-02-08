package com.campushub.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.campushub.model.TimeTable;
import com.campushub.repository.TimeTableRepository;

@Service
public class TimeTableService {

    @Autowired
    private TimeTableRepository timeTableRepository;

    // 1. Add Entry (With Conflict Logic)
    public TimeTable addTimeTableEntry(TimeTable entry) {
        
        // A. Check: Is the CLASS busy at this time?
        if (timeTableRepository.existsByCourseAndBranchAndSemesterAndSectionAndDayOfWeekAndTimeSlot(
                entry.getCourse(), entry.getBranch(), entry.getSemester(), entry.getSection(),
                entry.getDayOfWeek(), entry.getTimeSlot())) {
            throw new RuntimeException("Slot conflict: This class already has a subject at " + entry.getTimeSlot());
        }

        // B. Check: Is the FACULTY busy at this time?
        if (timeTableRepository.existsByFacultyIdAndDayOfWeekAndTimeSlot(
                entry.getFacultyId(), entry.getDayOfWeek(), entry.getTimeSlot())) {
            throw new RuntimeException("Faculty conflict: " + entry.getFacultyName() + " is busy in another class at " + entry.getTimeSlot());
        }

        return timeTableRepository.save(entry);
    }

    // 2. Get Student Timetable
    public List<TimeTable> getStudentTimetable(String course, String branch, Integer semester, String section) {
        return timeTableRepository.findByCourseAndBranchAndSemesterAndSection(course, branch, semester, section);
    }

    // 3. Get Faculty Timetable
    public List<TimeTable> getFacultyTimetable(String facultyId) {
        return timeTableRepository.findByFacultyId(facultyId);
    }
    
    // 4. Delete Entry (For HOD corrections)
    public void deleteEntry(Long id) {
        timeTableRepository.deleteById(id);
    }
}
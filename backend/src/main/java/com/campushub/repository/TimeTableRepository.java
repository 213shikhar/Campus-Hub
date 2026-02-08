package com.campushub.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.campushub.model.TimeTable;

@Repository
public interface TimeTableRepository extends JpaRepository<TimeTable, Long> {

    // 1. For Student View (Find by Class)
    List<TimeTable> findByCourseAndBranchAndSemesterAndSection(
        String course, String branch, Integer semester, String section
    );

    // 2. For Faculty View (Find by Teacher)
    List<TimeTable> findByFacultyId(String facultyId);

    // 3. For Conflict Checking (Find if a specific slot is already booked for a class)
    boolean existsByCourseAndBranchAndSemesterAndSectionAndDayOfWeekAndTimeSlot(
        String course, String branch, Integer semester, String section, String dayOfWeek, String timeSlot
    );

    // 4. For Faculty Conflict Checking (Is this teacher busy elsewhere at this time?)
    boolean existsByFacultyIdAndDayOfWeekAndTimeSlot(
        String facultyId, String dayOfWeek, String timeSlot
    );
}
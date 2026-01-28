package com.campushub.repository;

import com.campushub.model.ExamSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ExamScheduleRepository extends JpaRepository<ExamSchedule, Long> {
    // To fetch schedule for a specific class (Used by Student)
    List<ExamSchedule> findByCourseAndBranchAndSemesterOrderByExamDateAsc(String course, String branch, int semester);
}
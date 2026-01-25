package com.campushub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.campushub.model.Subject;

//SubjectRepository.java
@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
// Helpful for fetching subjects for a specific class later
List<Subject> findByCourseNameAndBranchNameAndSemester(String course, String branch, int semester);
}
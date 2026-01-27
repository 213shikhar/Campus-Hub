package com.campushub.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.campushub.model.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {
	
	// specific method for finding student by user id and password
	// This is a custom query method. findByAdmissionNoAndPassword is a custom method name, but should have Student field names.
	Optional <Student> findByAdmissionNoAndPassword(String admissionNo, String password);

	// ADD THIS NEW METHOD
    // This allows the Service to find a student by admission number 
    // to fetch or update their profile data.
    Optional<Student> findByAdmissionNo(String admissionNo);
    
 // Add inside StudentRepository interface
    List<Student> findByIsPlacedTrue();
    List<Student> findByCourseAndSemesterIn(String course, List<Integer> semesters);
    
 // Add this method ()
    List<Student> findByCourseAndBranch(String course, String branch);
}

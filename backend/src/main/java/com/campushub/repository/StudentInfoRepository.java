package com.campushub.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.campushub.model.StudentInfo;

import jakarta.transaction.Transactional;

@Repository
public interface StudentInfoRepository extends JpaRepository<StudentInfo, Integer>{
	// This automatically writes a query like: 
	    // "SELECT * FROM student_info WHERE admission_no = ?"
	    Optional<StudentInfo> findByStudent_AdmissionNo(String admissionNo);
	    
	    @Transactional
	    void deleteByStudent_AdmissionNo(String admissionNo);
}

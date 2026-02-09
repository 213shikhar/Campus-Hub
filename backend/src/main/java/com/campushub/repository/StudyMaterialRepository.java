package com.campushub.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.campushub.model.StudyMaterial;

@Repository
public interface StudyMaterialRepository extends JpaRepository<StudyMaterial, Long> {
    
    // Fetch materials for a specific class context
    List<StudyMaterial> findByCourseAndBranchAndSemester(String course, String branch, Integer semester);
    
 // ✅ NEW: Find by Faculty Name
    List<StudyMaterial> findByUploadedBy(String uploadedBy);
}
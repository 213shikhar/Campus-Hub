package com.campushub.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
//import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.campushub.model.StudyMaterial;
import com.campushub.repository.StudyMaterialRepository;

@Service
public class StudyMaterialService {

    @Autowired
    private StudyMaterialRepository repository;

    public StudyMaterial uploadMaterial(String title, String description, 
                                        String course, String branch, Integer semester, String section,
                                        String facultyName, MultipartFile file) 
                                        throws IOException {
        
        StudyMaterial material = new StudyMaterial();
        material.setTitle(title);
        material.setDescription(description);
        material.setCourse(course);
        material.setBranch(branch);
        material.setSemester(semester);
        material.setSection(section);
        material.setUploadedBy(facultyName);
        material.setUploadTime(LocalDateTime.now());

        // File Handling
        material.setFileName(file.getOriginalFilename());
        material.setContentType(file.getContentType());
        material.setData(file.getBytes());

        return repository.save(material);
    }
    
 // Inside StudyMaterialService.java

 // ✅ ADD @Transactional HERE (Fixes Student View)
    @Transactional(readOnly = true)
    public List<StudyMaterial> getMaterials(String course, String branch, Integer semester) {
        return repository.findByCourseAndBranchAndSemester(course, branch, semester);
    }

    // ✅ ADD @Transactional HERE (Fixes Faculty View / "My Uploads")
    @Transactional(readOnly = true)
    public List<StudyMaterial> getMaterialsByFaculty(String facultyName) {
        return repository.findByUploadedBy(facultyName);
    }

    public StudyMaterial getMaterialById(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("File not found"));
    }

    public void deleteMaterial(Long id) {
        repository.deleteById(id);
    }
}
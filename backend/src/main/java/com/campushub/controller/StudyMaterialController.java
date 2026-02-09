package com.campushub.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.campushub.model.StudyMaterial;
import com.campushub.service.StudyMaterialService;

@RestController
@RequestMapping("/api/study-material")
@CrossOrigin(origins = "http://localhost:3000")
public class StudyMaterialController {

    @Autowired
    private StudyMaterialService service;

    // 1. Upload
    @PostMapping("/upload")
    public ResponseEntity<?> uploadMaterial(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("course") String course,
            @RequestParam("branch") String branch,
            @RequestParam("semester") Integer semester,
            @RequestParam("section") String section,
            @RequestParam("uploadedBy") String uploadedBy,
            @RequestParam("file") MultipartFile file
    ) {
        try {
            service.uploadMaterial(title, description, course, branch, semester, section, uploadedBy, file);
            return ResponseEntity.ok("Material Uploaded Successfully");
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Upload Failed");
        }
    }

    // 2. View List (Lightweight - no file data)
    // We only fetch metadata here to keep the page load fast.
    @GetMapping("/list")
    public List<StudyMaterial> getMaterials(
            @RequestParam String course,
            @RequestParam String branch,
            @RequestParam Integer semester
    ) {
        List<StudyMaterial> list = service.getMaterials(course, branch, semester);
        // Nullify data to save bandwidth on list view
        list.forEach(m -> m.setData(null)); 
        return list;
    }

    // 3. Download File
    @GetMapping("/download/{id}")
    @Transactional // Required for LOB
    public ResponseEntity<byte[]> downloadMaterial(@PathVariable Long id) {
        StudyMaterial material = service.getMaterialById(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + material.getFileName() + "\"")
                .contentType(MediaType.parseMediaType(material.getContentType()))
                .body(material.getData());
    }

    // 4. Delete
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteMaterial(@PathVariable Long id) {
        service.deleteMaterial(id);
        return ResponseEntity.ok("Deleted");
    }
    
 // ✅ NEW: Get materials uploaded by a specific faculty
    @GetMapping("/faculty-list")
    public List<StudyMaterial> getMaterialsByFaculty(@RequestParam String uploadedBy) {
        List<StudyMaterial> list = service.getMaterialsByFaculty(uploadedBy);
        // Nullify data to save bandwidth (we only need metadata for the table)
        list.forEach(m -> m.setData(null)); 
        return list;
    }
}
package com.campushub.controller;

import com.campushub.model.PlacementNotice;
import com.campushub.model.Student;
import com.campushub.service.TPOService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/tpo")
@CrossOrigin(origins = "http://localhost:3000")
public class TPOController {

    @Autowired private TPOService tpoService;

    // --- Upload Notice ---
    @PostMapping("/notice/upload")
    public ResponseEntity<?> uploadNotice(@RequestParam("title") String title, 
                                          @RequestParam("file") MultipartFile file) {
        try {
            tpoService.uploadNotice(title, file);
            return ResponseEntity.ok("Notice uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Error uploading file");
        }
    }

    @GetMapping("/notices")
    public List<PlacementNotice> getNotices() { return tpoService.getAllNotices(); }

    // Download/View File Endpoint
    @GetMapping("/notice/view/{id}")
    public ResponseEntity<byte[]> viewNotice(@PathVariable Long id) {
        PlacementNotice notice = tpoService.getNoticeById(id);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(notice.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + notice.getFileName() + "\"")
                .body(notice.getData());
    }

    // --- Batch List ---
    @GetMapping("/batch-list")
    public List<Student> getBatchList() { return tpoService.getBatchStudents(); }

    // --- Placement Record ---
    @GetMapping("/placed-students")
    public List<Student> getPlacedStudents() { return tpoService.getPlacedStudents(); }
}
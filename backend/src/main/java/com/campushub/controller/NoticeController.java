package com.campushub.controller;

import com.campushub.model.Notice;
import com.campushub.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/notices")
@CrossOrigin(origins = "http://localhost:3000")
public class NoticeController {

    @Autowired private NoticeService noticeService;

    // --- Upload Notice (Generic) ---
    @PostMapping("/upload")
    public ResponseEntity<?> uploadNotice(@RequestParam("title") String title,
                                          @RequestParam("role") String role, 
                                          @RequestParam("file") MultipartFile file) {
        try {
            noticeService.uploadNotice(title, role, file);
            return ResponseEntity.ok("Notice uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error uploading file");
        }
    }

    // --- Get All Notices ---
    @GetMapping("/all")
    public List<Notice> getNotices() { return noticeService.getAllNotices(); }

    // --- View/Download PDF ---
    @GetMapping("/view/{id}")
    public ResponseEntity<byte[]> viewNotice(@PathVariable Long id) {
        Notice notice = noticeService.getNoticeById(id);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(notice.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + notice.getFileName() + "\"")
                .body(notice.getData());
    }
}
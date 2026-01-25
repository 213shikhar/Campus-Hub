package com.campushub.controller;

import com.campushub.model.Feedback;
import com.campushub.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "http://localhost:3000")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping("/submit")
    public ResponseEntity<?> submitFeedback(@RequestBody Feedback feedback) {
        if (feedback.getMessage() == null || feedback.getMessage().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Feedback message cannot be empty");
        }
        
        feedbackService.submitFeedback(feedback);
        return ResponseEntity.ok("Feedback submitted successfully");
    }
}
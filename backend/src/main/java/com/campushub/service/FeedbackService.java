package com.campushub.service;

import com.campushub.model.Feedback;
import com.campushub.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    public Feedback submitFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }
}
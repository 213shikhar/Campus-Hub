package com.campushub.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendWelcomeEmail(String toEmail, String name, String userId, String role) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("213shikharsharma@gmail.com");
            message.setTo(toEmail);
            message.setSubject("Welcome to CampusHub!");
            
            String text = "Dear " + name + ",\n\n"
                    + "Congratulations! You have been successfully registered to CampusHub as a " + role + ".\n\n"
                    + "Your User ID is: " + userId + "\n"
                    + "Best Regards,\n"
                    + "CampusHub Admin Team";
            
            message.setText(text);

            mailSender.send(message);
            System.out.println("Email Sent Successfully to " + toEmail);
            
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
        }
    }
    public void sendEmployeeWelcomeEmail(String toEmail, String name, String employeeId, String role) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("213shikharsharma@gmail.com");
            message.setTo(toEmail);
            message.setSubject("Welcome to CampusHub Faculty!");
            
            String text = "Dear " + name + ",\n\n"
                    + "Welcome aboard! You have been successfully registered as a " + role + " at CampusHub.\n\n"
                    + "Your Employee ID (User ID) is: " + employeeId + "\n"
                    + "Best Regards,\n"
                    + "CampusHub HR Team";
            
            message.setText(text);

            mailSender.send(message);
            System.out.println("✅ Employee Email Sent Successfully to " + toEmail);
            
        } catch (Exception e) {
            System.err.println("❌ Failed to send employee email: " + e.getMessage());
        }
    }
}
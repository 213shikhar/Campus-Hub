package com.campushub.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
    
    @NotBlank(message = "Role is required")
    private String role;     // "student" or "employee"
    
    private String type;     // "registrar", "tpo", "faculty", etc. (Optional for students)

    @NotBlank(message = "User ID is required")
    private String userId;   // Changed from 'userid' to 'userId' for consistency

    @NotBlank(message = "Password is required")
    private String password;
}
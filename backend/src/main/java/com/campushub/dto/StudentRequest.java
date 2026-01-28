package com.campushub.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentRequest {
	
    private Integer semester;

    @NotBlank(message = "Session is required")
    private String session;

    @NotBlank(message = "Course is required")
    private String course;

    @NotBlank(message = "Branch is required")
    private String branch;

    @NotBlank(message = "Admission number is required")
    @Size(min = 3, max = 20, message = "Admission number must be between 3 and 20 characters")
    private String admissionNo;

    @NotBlank(message = "Student name is required")
    @Size(min = 3, max = 50, message = "Student name must be between 3 and 50 characters")
    private String studentname;

    @NotBlank(message = "Mobile number is required")
    @Pattern(
        regexp = "^[6-9]\\d{9}$",
        message = "Mobile number must be a valid 10-digit Indian mobile number"
    )
    private String mobile;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;

    @NotBlank(message = "Address is required")
    @Size(max = 255, message = "Address must not exceed 255 characters")
    private String address;

    @NotBlank(message = "Password is required")
    @Pattern(
    	    regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$",
    	    message = "Password must min 8 characters, 1 lowercase, 1 uppercase, 1 special character"
    	)
    private String password;
}

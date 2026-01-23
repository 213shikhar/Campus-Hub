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
public class EmployeeRequest {
	
	@NotBlank(message = "Type is required")
	private String type;
	
	@NotBlank(message = "Course is required")
	private String course;
	
	@NotBlank(message = "Department is required")
	private String department;
	
	@NotBlank(message = "Employee ID is required")
	@Size(max=3, message = "Employee ID must be a 3 digit number")
	private String eid;
	
	@NotBlank(message = "Employee Name is required")
    @Size(min = 3, max = 20, message = "Employee name must be between 3 and 20 characters")
	private String employeeName;
	
	@NotBlank(message = "Mobile No. is required")
	@Pattern(
	        regexp = "^[6-9]\\d{9}$",
	        message = "Mobile number must be a valid 10-digit Indian mobile number"
	    )
	private String mobile;
	
	@NotBlank(message = "Email is required")
	@Email(message = "Email must be valid")
	private String email;
	
	@NotBlank(message = "Password is required")
	@Pattern(
		    regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$",
		    message = "Password must min 8 characters, 1 lowercase, 1 uppercase, 1 special character"
		)
	private String password;
}

// email regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// password regex
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// the function
export const validateRegistrationForm = (formData) => {
    const errors = {};
    
    // not empty
    if (!formData.type.trim()) {
    errors.type = "Type is required";
    }
    
    if (!formData.course.trim()) {
    errors.course = "Course is required";
    }

    if (!formData.department.trim()) {
    errors.department = "Department is required";
    }

    // name validation
    if (!formData.employeeName.trim()) {
    errors.employeeName = "Employee Name is required";
    } 
    else if (formData.employeeName.length < 3) {
      errors.employeeName = "Name must be at least 3 characters";
    } 
    else if (formData.employeeName.length > 20) {
      errors.employeeName = "Name cannot exceed 20 characters";
    }

    // eid validation
    if (!formData.eid.trim()) {
        errors.eid = "ID is required";
    } 
    else if (formData.eid.length !== 3) {
        errors.eid = "ID must be exactly 3 characters";
    }
    
    // mobile validation
    if (!formData.mobile.trim()) {
        errors.mobile = "Mobile Number is required";
    } 
    else if (formData.mobile.length !== 10) {
        errors.mobile = "Invalid Mobile Number";
    }

    // email validation 
    if (!formData.email) {
        errors.email = "Email is required";
    } 
    else if (!EMAIL_REGEX.test(formData.email)) {
        errors.email = "Invalid email format";
    }

    // password validation
    if (!formData.password) {
        errors.password = "Password is required";
    }
    else if (!PASSWORD_REGEX.test(formData.password)) {
        errors.password = "Password must be 8+ chars, with Upper, Lower, Number, and Special Char";
    }

    // confirm password
    if (formData.confirmPassword !== formData.password) {
        errors.confirmPassword = "Passwords do not match";
    }
    return errors;
};
// email regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// password regex
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// the function
export const validateRegistrationForm = (formData) => {
    const errors = {};
    // not empty
    if (!formData.session.trim()) {
    errors.session = "Session is required";
    }
    
    if (!formData.course.trim()) {
    errors.course = "Course is required";
    }

    if (!formData.branch.trim()) {
    errors.branch = "Branch is required";
    }

    // name validation
    if (!formData.studentname.trim()) {
    errors.studentname = "Student Name is required";
    } 
    else if (formData.studentname.length < 3) {
      errors.studentname = "Name must be at least 3 characters";
    } 
    else if (formData.studentname.length > 20) {
      errors.studentname = "Name cannot exceed 20 characters";
    }

    // student id / admission number validation
    if (!formData.admissionNo.trim()) {
        errors.admissionNo = "ID is required";
    } 
    else if (formData.admissionNo.length !== 3) {
        errors.admissionNo = "ID must be exactly 3 characters";
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

    // // file validation
    // if (!formData.photo) {
    //     errors.photo = "Profile picture is required";
    // } 
    // else {
    //     // 1. Check File Size
    //     if (formData.photo.size > MAX_FILE_SIZE) {
    //         errors.photo = "File size exceeds 1MB limit";
    //     }
    
    //     // 2. Check File Type (MIME type)
    //     else if (!ALLOWED_FILE_TYPES.includes(formData.photo.type)) {
    //         errors.photo = "Only JPEG and JPG files are allowed";
    //     }
    // }

    return errors;
};
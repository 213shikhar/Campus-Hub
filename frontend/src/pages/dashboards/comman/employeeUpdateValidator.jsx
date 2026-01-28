export const validateEmployeeUpdate = (data) => {
    let newErrors = {};

    // 1. Qualification Validation
    if (!data.qualification) {
        newErrors.qualification = "Qualification is required";
    }

    // 2. Experience Validation
    if (!data.experience || data.experience.trim() === "") {
        newErrors.experience = "Experience details are required";
    }

    // 3. Date of Birth Validation
    if (!data.dob) {
        newErrors.dob = "Date of Birth is required";
    } else {
        // Optional: Check if age is valid (e.g., 18+)
        const birthDate = new Date(data.dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 18) {
            newErrors.dob = "Employee must be at least 18 years old";
        }
    }

    // 4. PAN Card Validation
    // Standard Regex: 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    
    if (!data.panCardNo) {
        newErrors.panCardNo = "PAN Card Number is required";
    } else if (!panRegex.test(data.panCardNo.toUpperCase())) {
        newErrors.panCardNo = "Invalid PAN format (e.g., ABCDE1234F)";
    }

    return newErrors;
};
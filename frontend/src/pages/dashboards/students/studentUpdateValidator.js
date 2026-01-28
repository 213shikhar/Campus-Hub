export const validateUpdateForm = (data) => {
    let newErrors = {};

    // 1. Personal Details Validation
    if (!data.dob) newErrors.dob = "Date of Birth is required";
    if (!data.gender) newErrors.gender = "Gender is required";
    if (!data.category) newErrors.category = "Category is required";

    // 2. Adhaar Validation (12 Digits)
    // Regex: exactly 12 digits, no letters
    if (data.adhaarCardNo && !/^\d{12}$/.test(data.adhaarCardNo)) {
        newErrors.adhaarCardNo = "Adhaar must be exactly 12 digits";
    }

    // 3. Parent Details Validation
    if (!data.fatherName) newErrors.fatherName = "Father's Name is required";
    
    if (data.fatherMobile && !/^\d{10}$/.test(data.fatherMobile)) {
        newErrors.fatherMobile = "Mobile must be 10 digits";
    }

    if (!data.motherName) newErrors.motherName = "Mother's Name is required";
    
    if (data.motherMobile && !/^\d{10}$/.test(data.motherMobile)) {
        newErrors.motherMobile = "Mobile must be 10 digits";
    }

    // 4. Guardian Validation (Optional, but strict if filled)
    if (data.guardianMobile && !/^\d{10}$/.test(data.guardianMobile)) {
        newErrors.guardianMobile = "Mobile must be 10 digits";
    }

    return newErrors;
};
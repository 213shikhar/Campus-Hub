package com.campushub.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.campushub.dto.ChangePasswordRequest;
import com.campushub.dto.StudentProfileDTO;
import com.campushub.dto.StudentRequest;
import com.campushub.model.Student;
import com.campushub.model.StudentInfo;
import com.campushub.repository.StudentInfoRepository;
import com.campushub.repository.StudentRepository;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;
    
    @Autowired
    private StudentInfoRepository studentInfoRepository; // Ensure this is injected

    // method 1
    public Student registerStudent(StudentRequest request) {

        Student student = new Student();
        student.setSession(request.getSession());
        student.setCourse(request.getCourse());
        student.setBranch(request.getBranch());
        student.setAdmissionNo(request.getAdmissionNo());
        student.setStudentname(request.getStudentname());
        student.setMobile(request.getMobile());
        student.setEmail(request.getEmail());
        student.setAddress(request.getAddress());

        // Password hashing SHOULD be done here
        student.setPassword(request.getPassword());

        return studentRepository.save(student);
    }

    // method 2
    public StudentProfileDTO getStudentProfile(String admissionNo) {
        // 1. Fetch Core Data (Student Table)
        Student student = studentRepository.findByAdmissionNo(admissionNo)
            .orElseThrow(() -> new RuntimeException("Student not found with admission no: " + admissionNo));
        
        // 2. Fetch Extended Data (StudentInfo Table)
        // If no info exists yet, we create a new empty StudentInfo object so the code below doesn't crash on nulls
        StudentInfo info = studentInfoRepository.findByStudent_AdmissionNo(admissionNo)
            .orElse(new StudentInfo()); 

        // 3. Map Data to DTO
        StudentProfileDTO dto = new StudentProfileDTO();
        
        // --- Core Fields (Immutable, from Student Table) ---
        dto.setStudentName(student.getStudentname());
        dto.setAdmissionNo(student.getAdmissionNo());
        dto.setBranch(student.getBranch());
        dto.setCourse(student.getCourse());
        dto.setSession(student.getSession());
        dto.setEmail(student.getEmail());
        dto.setMobile(student.getMobile());
        dto.setAddress(student.getAddress());

        // --- Extended Fields (Mutable, from StudentInfo Table) ---
        dto.setDob(info.getDob());
        dto.setGender(info.getGender());
        dto.setCategory(info.getCategory());
        dto.setAdhaarCardNo(info.getAdhaarCardNo());
        
        // Father's Details
        dto.setFatherName(info.getFatherName());
        dto.setFatherOccupation(info.getFatherOccupation());
        dto.setFatherQualification(info.getFatherQualification());
        dto.setFatherMobile(info.getFatherMobile());
        dto.setFatherEmail(info.getFatherEmail());
        dto.setFatherAdhaar(info.getFatherAdhaar());
        
        // Mother's Details (assuming you added these fields to StudentInfo/DTO)
        dto.setMotherName(info.getMotherName());
        dto.setMotherOccupation(info.getMotherOccupation());
        dto.setMotherQualification(info.getMotherQualification());
        dto.setMotherMobile(info.getMotherMobile());
        dto.setMotherEmail(info.getMotherEmail());
        dto.setMotherAdhaar(info.getMotherAdhaar());
        
        // Guardian's Details
        dto.setGuardianName(info.getGuardianName());
        dto.setGuardianRelation(info.getGuardianRelation());
        dto.setGuardianAddress(info.getGuardianAddress());
        dto.setGuardianMobile(info.getGuardianMobile());

        // Document URLs
        dto.setPhotoUrl(info.getPhotoUrl());
        dto.setSignatureUrl(info.getSignatureUrl());
        dto.setTenthMarksheetUrl(info.getTenthMarksheetUrl());
        dto.setTwelfthMarksheetUrl(info.getTwelfthMarksheetUrl());

        return dto;
    }
    
    // method 3
    public void updateStudentInfo(String admissionNo, StudentProfileDTO dto) {
        // 1. Fetch the Core Student (to link the relationship)
        Student student = studentRepository.findByAdmissionNo(admissionNo)
            .orElseThrow(() -> new RuntimeException("Student not found"));

        // 2. Fetch existing Info or Create New
        StudentInfo info = studentInfoRepository.findByStudent_AdmissionNo(admissionNo)
            .orElse(new StudentInfo());
        
        // 3. Set/Update Fields
        info.setStudent(student); // Important: Link to the main student table
        
        // Personal Details
        info.setDob(dto.getDob());
        info.setGender(dto.getGender());
        info.setCategory(dto.getCategory());
        info.setAdhaarCardNo(dto.getAdhaarCardNo());

        // Father's Details
        info.setFatherName(dto.getFatherName());
        info.setFatherOccupation(dto.getFatherOccupation());
        info.setFatherQualification(dto.getFatherQualification());
        info.setFatherMobile(dto.getFatherMobile());
        info.setFatherEmail(dto.getFatherEmail());
        info.setFatherAdhaar(dto.getFatherAdhaar());

        // Mother's Details
        info.setMotherName(dto.getMotherName());
        // (Add other mother fields here if you have them in DTO/Entity)

        // Guardian's Details
        info.setGuardianName(dto.getGuardianName());
        info.setGuardianRelation(dto.getGuardianRelation());
        info.setGuardianAddress(dto.getGuardianAddress());
        info.setGuardianMobile(dto.getGuardianMobile());

        // 4. Save to Database
        studentInfoRepository.save(info); 
    }
    
    // method 4 - logic to verify the old password and save the new one
    public boolean changePassword(String admissionNo, ChangePasswordRequest request) {
        Student student = studentRepository.findByAdmissionNo(admissionNo)
            .orElseThrow(() -> new RuntimeException("Student not found"));

        // Check if old password matches
        if (!student.getPassword().equals(request.getOldPassword())) {
            return false; // Old password incorrect
        }

        // Update password
        student.setPassword(request.getNewPassword());
        studentRepository.save(student);
        return true;
    }
}

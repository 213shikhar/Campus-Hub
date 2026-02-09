package com.campushub.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.campushub.dto.ChangePasswordRequest;
import com.campushub.dto.StudentProfileDTO;
import com.campushub.dto.StudentRequest;
import com.campushub.model.Student;
import com.campushub.model.StudentInfo;
import com.campushub.repository.StudentInfoRepository;
import com.campushub.repository.StudentRepository;
import com.campushub.service.EmailService;

@Service
public class StudentService {

    @Autowired private StudentRepository studentRepository;
    @Autowired private StudentInfoRepository studentInfoRepository; 
    @Autowired private PasswordEncoder passwordEncoder; 
    @Autowired private EmailService emailService;

    // ✅ METHOD 1: REGISTER (With Image Handling)
    public Student registerStudent(StudentRequest request, MultipartFile imageFile) throws IOException {
        Student student = new Student();
        
        student.setSession(request.getSession());
        student.setCourse(request.getCourse());
        student.setBranch(request.getBranch());
        student.setAdmissionNo(request.getAdmissionNo());
        student.setStudentname(request.getStudentname());
        student.setMobile(request.getMobile());
        student.setEmail(request.getEmail());
        student.setAddress(request.getAddress());
        student.setSemester(request.getSemester());
        student.setSection(request.getSection());

        // Handle Image
        if (imageFile != null && !imageFile.isEmpty()) {
            student.setProfileImage(imageFile.getBytes());
        }

        // Hash Password
        student.setPassword(passwordEncoder.encode(request.getPassword()));
     // Save to Database
        Student savedStudent = studentRepository.save(student);

        // ✅ SEND EMAIL (Only if email exists)
        if (savedStudent.getEmail() != null && !savedStudent.getEmail().isEmpty()) {
            emailService.sendWelcomeEmail(
                savedStudent.getEmail(), 
                savedStudent.getStudentname(), 
                savedStudent.getAdmissionNo(), 
                "Student"
            );}
        return savedStudent;
    }

    @Transactional(readOnly = true)
    public StudentProfileDTO getStudentProfile(String admissionNo) {
        // 1. Fetch Core Data
        Student student = studentRepository.findByAdmissionNo(admissionNo)
            .orElseThrow(() -> new RuntimeException("Student not found with admission no: " + admissionNo));
        
        // 2. Fetch Extended Data
        StudentInfo info = studentInfoRepository.findByStudent_AdmissionNo(admissionNo)
            .orElse(new StudentInfo()); 

        // 3. Map to DTO
        StudentProfileDTO dto = new StudentProfileDTO();
        
        // Core Fields
        dto.setStudentName(student.getStudentname());
        dto.setAdmissionNo(student.getAdmissionNo());
        dto.setBranch(student.getBranch());
        dto.setCourse(student.getCourse());
        dto.setSession(student.getSession());
        dto.setEmail(student.getEmail());
        dto.setMobile(student.getMobile());
        dto.setAddress(student.getAddress());
        dto.setSemester(student.getSemester());
        dto.setSection(student.getSection());
        dto.setProfileImage(student.getProfileImage()); // ✅ Image Data

        // Extended Fields
        dto.setDob(info.getDob());
        dto.setGender(info.getGender());
        dto.setCategory(info.getCategory());
        dto.setAdhaarCardNo(info.getAdhaarCardNo());
        
        dto.setFatherName(info.getFatherName());
        dto.setFatherOccupation(info.getFatherOccupation());
        dto.setFatherQualification(info.getFatherQualification());
        dto.setFatherMobile(info.getFatherMobile());
        dto.setFatherEmail(info.getFatherEmail());
        dto.setFatherAdhaar(info.getFatherAdhaar());
        
        dto.setMotherName(info.getMotherName());
        dto.setMotherOccupation(info.getMotherOccupation());
        dto.setMotherQualification(info.getMotherQualification());
        dto.setMotherMobile(info.getMotherMobile());
        dto.setMotherEmail(info.getMotherEmail());
        dto.setMotherAdhaar(info.getMotherAdhaar());
        
        dto.setGuardianName(info.getGuardianName());
        dto.setGuardianRelation(info.getGuardianRelation());
        dto.setGuardianAddress(info.getGuardianAddress());
        dto.setGuardianMobile(info.getGuardianMobile());

        return dto;
    }
    
    // ✅ METHOD 3: UPDATE PROFILE
    @Transactional
    public void updateStudentInfo(String admissionNo, StudentProfileDTO dto) {
        Student student = studentRepository.findByAdmissionNo(admissionNo)
            .orElseThrow(() -> new RuntimeException("Student not found"));

        StudentInfo info = studentInfoRepository.findByStudent_AdmissionNo(admissionNo)
            .orElse(new StudentInfo());
        
        info.setStudent(student);
        
        // Map DTO to Entity
        info.setDob(dto.getDob());
        info.setGender(dto.getGender());
        info.setCategory(dto.getCategory());
        info.setAdhaarCardNo(dto.getAdhaarCardNo());

        info.setFatherName(dto.getFatherName());
        info.setFatherOccupation(dto.getFatherOccupation());
        info.setFatherQualification(dto.getFatherQualification());
        info.setFatherMobile(dto.getFatherMobile());
        info.setFatherEmail(dto.getFatherEmail());
        info.setFatherAdhaar(dto.getFatherAdhaar());

        info.setMotherName(dto.getMotherName());
        info.setMotherOccupation(dto.getMotherOccupation());
        info.setMotherQualification(dto.getMotherQualification());
        info.setMotherMobile(dto.getMotherMobile());
        info.setMotherEmail(dto.getMotherEmail());
        info.setMotherAdhaar(dto.getMotherAdhaar());

        info.setGuardianName(dto.getGuardianName());
        info.setGuardianRelation(dto.getGuardianRelation());
        info.setGuardianAddress(dto.getGuardianAddress());
        info.setGuardianMobile(dto.getGuardianMobile());

        studentInfoRepository.save(info); 
    }
    
    // ✅ METHOD 4: CHANGE PASSWORD (Logic Fixed)
    @Transactional
    public boolean changePassword(String admissionNo, ChangePasswordRequest request) {
        Student student = studentRepository.findByAdmissionNo(admissionNo)
            .orElseThrow(() -> new RuntimeException("Student not found"));

        // 1. Verify Old Password
        if (passwordEncoder.matches(request.getOldPassword(), student.getPassword())) {
            // 2. Hash New Password & Save
            student.setPassword(passwordEncoder.encode(request.getNewPassword()));
            studentRepository.save(student);
            return true;
        }

        // 3. Return False if mismatch (Do NOT save plaintext password)
        return false;
    }
}
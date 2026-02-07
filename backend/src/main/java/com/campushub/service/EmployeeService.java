package com.campushub.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // ✅ Import for LOB handling
import org.springframework.web.multipart.MultipartFile; // ✅ Import for Image

import com.campushub.dto.ChangePasswordRequest;
import com.campushub.dto.EmployeeProfileDTO;
import com.campushub.dto.EmployeeRequest;
import com.campushub.model.Employee;
import com.campushub.model.EmployeeInfo;
import com.campushub.repository.EmployeeInfoRepository;
import com.campushub.repository.EmployeeRepository;

@Service
public class EmployeeService {
    
    @Autowired private EmployeeRepository employeeRepository;
    @Autowired private EmployeeInfoRepository employeeInfoRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    
    // ✅ UPDATED: Accepts MultipartFile for Image Upload
    public Employee registerEmployee(EmployeeRequest request, MultipartFile imageFile) throws IOException {
        Employee employee = new Employee();
        
        // Basic Details
        employee.setType(request.getType());
        employee.setCourse(request.getCourse());
        employee.setDepartment(request.getDepartment());
        employee.setEid(request.getEid());
        employee.setEmployeeName(request.getEmployeeName());
        employee.setMobile(request.getMobile());
        employee.setEmail(request.getEmail());
     // ✅ Add this line
        employee.setAddress(request.getAddress());
        
        // ✅ Handle Profile Image
        if (imageFile != null && !imageFile.isEmpty()) {
            employee.setProfileImage(imageFile.getBytes());
        }

        // Hash Password
        employee.setPassword(passwordEncoder.encode(request.getPassword()));
        
        return employeeRepository.save(employee);
    }

    // ✅ UPDATED: Added @Transactional to fix "Unable to access lob stream"
    @Transactional(readOnly = true)
    public EmployeeProfileDTO getEmployeeProfile(String eid) {
        Employee emp = employeeRepository.findByEid(eid)
            .orElseThrow(() -> new RuntimeException("Employee not found"));
        
        EmployeeInfo info = employeeInfoRepository.findByEmployee_Eid(eid)
            .orElse(new EmployeeInfo());

        EmployeeProfileDTO dto = new EmployeeProfileDTO();
        
        // Core Details
        dto.setEmployeeName(emp.getEmployeeName());
        dto.setEid(emp.getEid());
        dto.setDepartment(emp.getDepartment());
        dto.setCourse(emp.getCourse());
        dto.setType(emp.getType());
        dto.setEmail(emp.getEmail());
        dto.setMobile(emp.getMobile());
     // ✅ MAKE SURE THIS LINE EXISTS
        dto.setProfileImage(emp.getProfileImage());
        

        // Extended Info
        dto.setDob(info.getDob());
        dto.setGender(info.getGender());
        dto.setCategory(info.getCategory());
        dto.setAddress(info.getAddress());
        dto.setQualification(info.getQualification());
        dto.setExperience(info.getExperience());
        dto.setAdhaarCardNo(info.getAdhaarCardNo());
        dto.setPanCardNo(info.getPanCardNo());
        dto.setFatherName(info.getFatherName());
        dto.setMotherName(info.getMotherName());
        dto.setSpouseName(info.getSpouseName());
        // dto.setPhotoUrl(info.getPhotoUrl()); // Replaced by profileImage

        return dto;
    }

    // ✅ UPDATED: Added @Transactional
    @Transactional
    public void updateEmployeeInfo(String eid, EmployeeProfileDTO dto) {
        Employee emp = employeeRepository.findByEid(eid)
            .orElseThrow(() -> new RuntimeException("Employee not found"));

        EmployeeInfo info = employeeInfoRepository.findByEmployee_Eid(eid)
            .orElse(new EmployeeInfo());

        // Link to Parent Entity
        info.setEmployee(emp);
        
        // Update Fields
        info.setDob(dto.getDob());
        info.setGender(dto.getGender());
        info.setCategory(dto.getCategory());
        info.setAddress(dto.getAddress());
        info.setQualification(dto.getQualification());
        info.setExperience(dto.getExperience());
        info.setAdhaarCardNo(dto.getAdhaarCardNo());
        info.setPanCardNo(dto.getPanCardNo());
        info.setFatherName(dto.getFatherName());
        info.setMotherName(dto.getMotherName());
        info.setSpouseName(dto.getSpouseName());
            
        employeeInfoRepository.save(info);
    }
    
    // ✅ FIXED LOGIC: Previously it was resetting password even if match failed
    public boolean changePassword(String eid, ChangePasswordRequest request) {
        Employee employee = employeeRepository.findByEid(eid)
            .orElseThrow(() -> new RuntimeException("Employee not found"));

        // Verify Old Password
        if (passwordEncoder.matches(request.getOldPassword(), employee.getPassword())) {
            
            // Hash the NEW password before saving
            employee.setPassword(passwordEncoder.encode(request.getNewPassword()));
            employeeRepository.save(employee);
            return true;
        }

        // Return false if old password was wrong
        return false;
    }
}
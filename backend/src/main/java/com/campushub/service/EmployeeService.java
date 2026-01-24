package com.campushub.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.campushub.dto.EmployeeRequest;
import com.campushub.dto.ChangePasswordRequest;
import com.campushub.dto.EmployeeProfileDTO;
import com.campushub.model.Employee;
import com.campushub.model.EmployeeInfo;
import com.campushub.repository.EmployeeRepository;
import com.campushub.repository.EmployeeInfoRepository;

@Service
public class EmployeeService {
    
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeInfoRepository employeeInfoRepository;
    
    // Existing Registration Method
    public Employee registerEmployee(EmployeeRequest request) {
        Employee employee = new Employee();
        employee.setType(request.getType());
        employee.setCourse(request.getCourse());
        employee.setDepartment(request.getDepartment());
        employee.setEid(request.getEid());
        employee.setEmployeeName(request.getEmployeeName());
        employee.setMobile(request.getMobile());
        employee.setEmail(request.getEmail());
        employee.setPassword(request.getPassword()); // Remember to hash this in real apps!
        return employeeRepository.save(employee);
    }

    // ✅ New: Get Profile
    public EmployeeProfileDTO getEmployeeProfile(String eid) {
        Employee emp = employeeRepository.findByEid(eid)
            .orElseThrow(() -> new RuntimeException("Employee not found"));
        
        EmployeeInfo info = employeeInfoRepository.findByEmployee_Eid(eid)
            .orElse(new EmployeeInfo());

        EmployeeProfileDTO dto = new EmployeeProfileDTO();
        
        // Core
        dto.setEmployeeName(emp.getEmployeeName());
        dto.setEid(emp.getEid());
        dto.setDepartment(emp.getDepartment());
        dto.setCourse(emp.getCourse());
        dto.setType(emp.getType());
        dto.setEmail(emp.getEmail());
        dto.setMobile(emp.getMobile());

        // Extended
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
        dto.setPhotoUrl(info.getPhotoUrl());

        return dto;
    }

    // ✅ New: Update Profile
    public void updateEmployeeInfo(String eid, EmployeeProfileDTO dto) {
        Employee emp = employeeRepository.findByEid(eid)
            .orElseThrow(() -> new RuntimeException("Employee not found"));

        EmployeeInfo info = employeeInfoRepository.findByEmployee_Eid(eid)
            .orElse(new EmployeeInfo());

        info.setEmployee(emp);
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
    
    public boolean changePassword(String eid, ChangePasswordRequest request) {
        Employee employee = employeeRepository.findByEid(eid)
            .orElseThrow(() -> new RuntimeException("Employee not found"));

        if (!employee.getPassword().equals(request.getOldPassword())) {
            return false;
        }

        employee.setPassword(request.getNewPassword());
        employeeRepository.save(employee);
        return true;
    }
}
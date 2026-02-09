package com.campushub.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.campushub.model.AdminUser;
import com.campushub.model.Employee;
import com.campushub.model.Student;
import com.campushub.repository.AdminUserRepository;
import com.campushub.repository.EmployeeRepository;
import com.campushub.repository.StudentRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired private StudentRepository studentRepository;
    @Autowired private EmployeeRepository employeeRepository;
    @Autowired private AdminUserRepository adminUserRepository;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        
        System.out.println("🔍 Auth Attempt: Searching for User ID -> " + userId);

        // 1. Check Student Table
        Student student = studentRepository.findByAdmissionNo(userId).orElse(null);
        if (student != null) {
            System.out.println("✅ Found Student: " + student.getStudentname());
            return new User(student.getAdmissionNo(), student.getPassword(), new ArrayList<>());
        }

        // 2. Check Employee Table
        Employee employee = employeeRepository.findByEid(userId).orElse(null);
        if (employee != null) {
            System.out.println("✅ Found Employee: " + employee.getEmployeeName());
            return new User(employee.getEid(), employee.getPassword(), new ArrayList<>());
        }

        // 3. Check Admin Table (Registrar/TPO)
        try {
            // Only attempt to parse if it looks like an Integer ID (Admin IDs are often Integers)
            Integer adminId = Integer.parseInt(userId); 
            
            AdminUser admin = adminUserRepository.findById(adminId).orElse(null);
            if (admin != null) {
                System.out.println("✅ Found Admin User ID: " + adminId);
                return new User(String.valueOf(admin.getUserId()), admin.getPassword(), new ArrayList<>());
            }
        } catch (NumberFormatException e) {
            // This is normal. If ID is "EMP001", it's not an Integer, so it's definitely not an Admin ID.
            // We silently ignore this and move to the exception below.
        }

        // 4. If Not Found Anywhere
        System.out.println("❌ User NOT FOUND in any table: " + userId);
        throw new UsernameNotFoundException("User not found with ID: " + userId);
    }
}
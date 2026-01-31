package com.campushub.config;

import com.campushub.model.AdminUser;
import com.campushub.repository.AdminUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired private AdminUserRepository adminUserRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        
        // 1. Check if Registrar exists
        AdminUser registrar = adminUserRepository.findByUserIdAndRole("registrar", "registrar")
                .orElse(null);

        if (registrar == null) {
            // Create New Registrar
            AdminUser newRegistrar = new AdminUser();
            newRegistrar.setUserId("registrar");
            newRegistrar.setRole("registrar");
            
            // Hash the password
            newRegistrar.setPassword(passwordEncoder.encode("campushub123")); 
            
            adminUserRepository.save(newRegistrar);
            System.out.println("✅ Registrar account created with Hashed Password.");
        } 
        else {
            // If password length is short (e.g., 12 chars), it is plain text. 
            // BCrypt hashes are always 60 chars long.
            if (registrar.getPassword().length() < 50) {
                registrar.setPassword(passwordEncoder.encode("campushub123"));
                adminUserRepository.save(registrar);
                System.out.println("Migrated Registrar password from Plain Text to Hash.");
            }
        }
    }
}
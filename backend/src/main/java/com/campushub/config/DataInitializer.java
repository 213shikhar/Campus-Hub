package com.campushub.config;

import com.campushub.model.AdminUser;
import com.campushub.repository.AdminUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private AdminUserRepository adminUserRepository;

    @Override
    public void run(String... args) throws Exception {
        // 1. Create Registrar if not exists
        if (adminUserRepository.findByUserIdAndRole("registrar", "registrar").isEmpty()) {
            AdminUser registrar = new AdminUser();
            registrar.setUserId("registrar");       // Login ID
            registrar.setPassword("campushub123");  // HARDCODED PASSWORD
            registrar.setRole("registrar");
            adminUserRepository.save(registrar);
            System.out.println("✅ Registrar account created.");
        }

        // 2. Create TPO if not exists
        if (adminUserRepository.findByUserIdAndRole("tpo", "tpo").isEmpty()) {
            AdminUser tpo = new AdminUser();
            tpo.setUserId("tpo");                   // Login ID
            tpo.setPassword("campushub123");        // HARDCODED PASSWORD
            tpo.setRole("tpo");
            adminUserRepository.save(tpo);
            System.out.println("✅ TPO account created.");
        }
    }
}
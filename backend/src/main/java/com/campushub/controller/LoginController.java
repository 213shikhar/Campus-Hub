package com.campushub.controller;

import com.campushub.dto.LoginRequest;
import com.campushub.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Ensure React can reach this
public class LoginController {

    @Autowired
    private LoginService loginService; // ✅ Delegate to Service

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            // The service handles all logic and DB lookups
            Object user = loginService.loginUser(loginRequest);
            return ResponseEntity.ok(user);
            
        } catch (RuntimeException e) {
            // If any "throw new RuntimeException" triggers in Service, it lands here
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
}
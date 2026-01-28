package com.campushub.controller;

import com.campushub.dto.LoginRequest;
import com.campushub.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

    @Autowired private LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
        	
            Object user = loginService.loginUser(loginRequest);
            return ResponseEntity.ok(user);
            
        } catch (RuntimeException e) {
            // If any "throw new RuntimeException" triggers in Service, it lands here
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
}
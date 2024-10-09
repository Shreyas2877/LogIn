// src/main/java/com/app/controller/AuthController.java
package com.trojan.loginserver.controller;

import com.trojan.loginserver.model.User;
import com.trojan.loginserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        if (userService.loginUser(user.getEmail(), user.getPassword()).isPresent()) {
            return ResponseEntity.badRequest().body("User already exists");
        }
        userService.registerUser(user.getEmail(), user.getPassword());
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Optional<User> existingUser = userService.loginUser(user.getEmail(), user.getPassword());
        if (existingUser.isPresent()) {
            return ResponseEntity.ok("Login successful");
        }
        return ResponseEntity.status(401).body("Invalid email or password");
    }

    @PostMapping("/deregister")
    public ResponseEntity<?> deregister(@RequestBody User user) {
        userService.deregisterUser(user.getEmail());
        return ResponseEntity.ok("User deregistered successfully");
    }
}

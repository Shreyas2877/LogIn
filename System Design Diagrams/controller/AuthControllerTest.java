// src/test/java/com/trojan/loginserver/controller/AuthControllerTest.java
package com.trojan.loginserver.controller;

import com.trojan.loginserver.dto.SignupRequest;
import com.trojan.loginserver.dto.LoginRequest;
import com.trojan.loginserver.model.User;
import com.trojan.loginserver.service.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class AuthControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private AuthController authController;

    @Test
    void testSignup() {
        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setEmail("test@example.com");
        signupRequest.setPassword("password");
        signupRequest.setUserName("testUser");

        when(userService.userExists(signupRequest.getEmail())).thenReturn(false);

        ResponseEntity<?> response = authController.signup(signupRequest);

        assertEquals("User registered successfully", response.getBody());
        verify(userService, times(1)).registerUser(signupRequest.getEmail(), signupRequest.getPassword(), signupRequest.getUserName());
    }

    @Test
    void testLogin() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("test@example.com");
        loginRequest.setPassword("password");

        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("password");

        when(userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword())).thenReturn(Optional.of(user));

        ResponseEntity<?> response = authController.login(loginRequest, null);

        assertEquals("Login successful", response.getBody());
    }
}
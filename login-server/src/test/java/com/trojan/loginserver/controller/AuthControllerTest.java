// src/test/java/com/trojan/loginserver/controller/AuthControllerTest.java
package com.trojan.loginserver.controller;

import com.trojan.loginserver.exception.ResourceNotFoundException;
import com.trojan.loginserver.model.User;
import com.trojan.loginserver.service.CookieService;
import com.trojan.loginserver.service.JwtService;
import com.trojan.loginserver.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuthControllerTest {

    @Mock
    private UserService userService;

    @Mock
    private JwtService jwtService;

    @Mock
    private CookieService cookieService;

    @Mock
    private HttpServletResponse response;

    @InjectMocks
    private AuthController authController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSignup_UserAlreadyExists() {
        User user = new User();
        user.setEmail("test@example.com");

        when(userService.userExists(user.getEmail())).thenReturn(true);

        assertThrows(ResourceNotFoundException.class, () -> authController.signup(user));
    }

    @Test
    void testSignup_Success() {
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("password");

        when(userService.userExists(user.getEmail())).thenReturn(false);

        ResponseEntity<?> response = authController.signup(user);

        assertEquals("User registered successfully", response.getBody());
    }

    @Test
    void testLogin_InvalidCredentials() {
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("wrongpassword");

        when(userService.loginUser(user.getEmail(), user.getPassword())).thenReturn(Optional.empty());

        ResponseEntity<?> response = authController.login(user, this.response);

        assertEquals(401, response.getStatusCodeValue());
        assertEquals("Invalid email or password", response.getBody());
    }

    @Test
    void testLogin_Success() {
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("password");

        User loggedInUser = new User();
        loggedInUser.setEmail("test@example.com");
        loggedInUser.setId(1L);

        when(userService.loginUser(user.getEmail(), user.getPassword())).thenReturn(Optional.of(loggedInUser));
        when(jwtService.generateToken(loggedInUser.getEmail(), loggedInUser.getId())).thenReturn("token");
        when(cookieService.createCookie("jwt", "token", 86400)).thenReturn(new Cookie("jwt", "token"));

        ResponseEntity<?> response = authController.login(user, this.response);

        assertEquals("Login successful", response.getBody());
    }
}
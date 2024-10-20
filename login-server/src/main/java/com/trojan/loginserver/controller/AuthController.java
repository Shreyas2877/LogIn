// src/main/java/com/trojan/loginserver/controller/AuthController.java
package com.trojan.loginserver.controller;

import com.trojan.loginserver.exception.ResourceNotFoundException;
import com.trojan.loginserver.model.User;
import com.trojan.loginserver.model.UserProfile;
import com.trojan.loginserver.service.CookieService;
import com.trojan.loginserver.service.JwtService;
import com.trojan.loginserver.service.UserService;
import io.jsonwebtoken.Claims;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CookieService cookieService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        logger.debug("Signup request received for email: {}", user.getEmail());
        if (userService.userExists(user.getEmail())) {
            logger.warn("User already exists: {}", user.getEmail());
            throw new ResourceNotFoundException("User already exists");
        }
        userService.registerUser(user.getEmail(), user.getPassword());
        logger.info("User registered successfully: {}", user.getEmail());
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user, HttpServletResponse response) {
        logger.debug("Login request received for email: {}", user.getEmail());
        Optional<User> existingUser = userService.loginUser(user.getEmail(), user.getPassword());
        if (existingUser.isPresent()) {
            User loggedInUser = existingUser.get();
            String token = jwtService.generateToken(loggedInUser.getEmail(), loggedInUser.getId());

            Cookie cookie = cookieService.createCookie("jwt", token, 86400); // 1 day in seconds
            response.addCookie(cookie);

            logger.info("Login successful for email: {}", user.getEmail());
            return ResponseEntity.ok("Login successful");
        }
        logger.warn("Invalid login attempt for email: {}", user.getEmail());
        return ResponseEntity.status(401).body("Invalid email or password");
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(HttpServletRequest request) {
        String token = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwt".equals(cookie.getName())) {
                    token = cookie.getValue();
                    break;
                }
            }
        }

        if (token == null) {
            logger.warn("Unauthorized access attempt");
            return ResponseEntity.status(401).body("Unauthorized");
        }

        try {
            Claims claims = jwtService.validateToken(token);
            String email = claims.getSubject();
            Long id = claims.get("id", Long.class);

            logger.debug("Profile request for email: {}", email);
            return ResponseEntity.ok(new UserProfile(email, id));
        } catch (Exception e) {
            logger.error("Invalid token", e);
            return ResponseEntity.status(401).body("Invalid token");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie cookie = cookieService.deleteCookie("jwt");
        response.addCookie(cookie);
        logger.info("Logout successful");
        return ResponseEntity.ok("Logout successful");
    }

    @PostMapping("/deregister")
    public ResponseEntity<?> deregister(@RequestBody User user) {
        logger.debug("Deregister request received for email: {}", user.getEmail());
        userService.deregisterUser(user.getEmail());
        logger.info("User deregistered successfully: {}", user.getEmail());
        return ResponseEntity.ok("User deregistered successfully");
    }
}
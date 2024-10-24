package com.trojan.loginserver.controller;

import com.trojan.loginserver.service.EmailService;
import com.trojan.loginserver.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserService userService;

    @PostMapping("/send")
    public ResponseEntity<String> sendOtp(@RequestParam String email) {
        try {
            emailService.sendOtp(email);
            return new ResponseEntity<>("Email sent successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to send email", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/validate")
    public ResponseEntity<String> validateOtp(@RequestParam String email, @RequestParam String otp, HttpServletResponse response) throws Exception {
        boolean isValid = emailService.validateOtp(email, otp, response);
        if (isValid) {
            return new ResponseEntity<>("Email verified successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid or expired OTP", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/sendVerificationEmail")
    public ResponseEntity<String> sendVerificationEmail(@RequestParam String email) {
        try {
            emailService.sendVerificationEmail(email);
            return new ResponseEntity<>("Verification email is sent to the email address : "+email, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to send verification email", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/validateVerificationToken")
    public ResponseEntity<String> validateVerificationToken(@RequestParam String token) {
        try {
            boolean isValid = emailService.validateVerificationToken(token);
            if (isValid) {
                return new ResponseEntity<>("Email verified successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Invalid or expired verification token", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to validate verification token", HttpStatus.BAD_REQUEST);
        }
    }
}
package com.trojan.loginserver.controller;

import com.trojan.loginserver.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public String sendOtp(@RequestParam String email) {
        emailService.sendOtp(email);
        return "Email sent successfully";
    }

    @PostMapping("/validate")
    public String validateOtp(@RequestParam String email, @RequestParam String otp) {
        boolean isValid = emailService.validateOtp(email, otp);
        if (isValid) {
            return "Email verified successfully";
        } else {
            return "Invalid or expired OTP";
        }
    }
}
package com.trojan.loginserver.service;

import com.trojan.loginserver.exception.ResourceNotFoundException;
import com.trojan.loginserver.model.User;
import com.trojan.loginserver.repository.UserRepository;
import com.trojan.loginserver.util.EncryptionUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Optional;
import java.util.Random;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EncryptionUtil encryptionUtil = new EncryptionUtil();

    @Autowired
    private UserService userService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void sendOtp(String email) throws Exception {
        String otp = generateOtp();
        System.out.println("OTP: " + otp);
        LocalDateTime expirationTime = LocalDateTime.now().plusMinutes(5);

        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            String EncOtp = encryptionUtil.encrypt(otp);
            user.setEmailOtp(EncOtp);
            user.setOtpExpiration(expirationTime);
            userRepository.save(user);
            System.out.println("Control here");
            try {
                sendEmail(email, otp);
            } catch (MessagingException e) {
                throw new RuntimeException("Failed to send email", e);
            }
        } else {
            throw new ResourceNotFoundException("User not found");
        }
    }

    private String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    private void sendEmail(String toEmail, String otp) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom(fromEmail);
        helper.setTo(toEmail);
        helper.setSubject("Your OTP Code for TrojApp Authentication");

        String htmlContent = "<html><body style='font-family: Arial, sans-serif; color: #333;'>"
                + "<div style='background-color: #f5f5f5; padding: 20px;'>"
                + "<div style='max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px;'>"

                // Header with logo and website name
                + "<div style='text-align: center;'>"
                + "<h2 style='color: #4E65FF;'>Welcome to TrojApp</h2>"
                + "<p style='color: #888;'>Secure Authentication, Simplified</p>"
                + "</div>"

                // OTP details
                + "<h3>Your One-Time Password (OTP) for TrojApp</h3>"
                + "<p style='font-size: 16px;'>Hello,</p>"
                + "<p style='font-size: 16px;'>Please use the following One-Time Password (OTP) to complete your login to TrojApp:</p>"
                + "<div style='text-align: center; font-size: 24px; color: #4E65FF; font-weight: bold;'>"
                + otp
                + "</div>"
                + "<p style='font-size: 16px;'>This OTP will expire in <strong>5 minutes</strong>. If you didn’t request this, please ignore this email or contact our support team immediately.</p>"

                // Security tip
                + "<div style='margin-top: 20px; padding: 15px; background-color: #eaf7ff; border-left: 5px solid #4E65FF;'>"
                + "<p style='font-size: 14px; margin: 0;'>For your security, never share your OTP with anyone. TrojApp will never ask for your OTP via email, phone, or any other channel.</p>"
                + "</div>"

                // Footer with support details
                + "<div style='margin-top: 30px; text-align: center;'>"
                + "<p style='font-size: 14px; color: #888;'>Need help? <a href='mailto:support@trojapp.com' style='color: #4E65FF;'>Contact our support team</a></p>"
                + "<p style='font-size: 12px; color: #aaa;'>© 2024 TrojApp. All rights reserved.</p>"
                + "</div>"

                + "</div>"
                + "</div>"
                + "</body></html>";

        helper.setText(htmlContent, true);

        mailSender.send(message);
    }


    public boolean validateOtp(String email, String otp, HttpServletResponse response) throws Exception {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            String decryptedOtp = encryptionUtil.decrypt(user.getEmailOtp());
            if(decryptedOtp.equals(otp) && user.getOtpExpiration().isAfter(LocalDateTime.now())) {
                userService.setJwt(response, userOptional);
                return true;
            }
        }
        return false;
    }

    public void sendVerificationEmail(String email) throws Exception {
        String otp = generateOtp();
        LocalDateTime expirationTime = LocalDateTime.now().plusMinutes(5);

        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            String EncOtp = Base64.getEncoder().encodeToString(otp.getBytes());
            user.setEmailOtp(EncOtp);
            user.setOtpExpiration(expirationTime);
            userRepository.save(user);

            String token = Base64.getEncoder().encodeToString((email + ":" + otp).getBytes());
            String verificationUrl = "http://localhost:3000/verify-email?token=" + token;
            sendVerificationEmailWithLink(email, verificationUrl);
        } else {
            throw new ResourceNotFoundException("User not found");
        }
    }

    private void sendVerificationEmailWithLink(String toEmail, String verificationUrl) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom(fromEmail);
        helper.setTo(toEmail);
        helper.setSubject("Verify Your Email for TrojApp");

        String htmlContent = "<html><body style='font-family: Arial, sans-serif; color: #333;'>"
                + "<div style='background-color: #f5f5f5; padding: 20px;'>"
                + "<div style='max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px;'>"

                // Header with logo and website name
                + "<div style='text-align: center;'>"
                + "<h2 style='color: #4E65FF;'>Welcome to TrojApp</h2>"
                + "<p style='color: #888;'>Complete Your Signup by Verifying Your Email</p>"
                + "</div>"

                // Verification link and details
                + "<h3>Verify Your Email Address</h3>"
                + "<p style='font-size: 16px;'>Hello,</p>"
                + "<p style='font-size: 16px;'>Thank you for signing up for TrojApp. To complete your registration, please verify your email by clicking the link below:</p>"
                + "<div style='text-align: center; margin-top: 20px;'>"
                + "<a href='" + verificationUrl + "' style='background-color: #4E65FF; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>Verify Email</a>"
                + "</div>"
                + "<p style='font-size: 16px; margin-top: 20px;'>This link will expire in <strong>5 minutes</strong>. If you didn’t request this, please ignore this email.</p>"

                // Security tip
                + "<div style='margin-top: 20px; padding: 15px; background-color: #eaf7ff; border-left: 5px solid #4E65FF;'>"
                + "<p style='font-size: 14px; margin: 0;'>For your security, only click this link if you requested email verification. TrojApp will never ask you for personal information via email.</p>"
                + "</div>"

                // Footer with support details
                + "<div style='margin-top: 30px; text-align: center;'>"
                + "<p style='font-size: 14px; color: #888;'>Need help? <a href='mailto:support@trojapp.com' style='color: #4E65FF;'>Contact our support team</a></p>"
                + "<p style='font-size: 12px; color: #aaa;'>© 2024 TrojApp. All rights reserved.</p>"
                + "</div>"

                + "</div>"
                + "</div>"
                + "</body></html>";

        helper.setText(htmlContent, true);

        mailSender.send(message);
    }


    public void sendDeregisteredEmail(String email) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom(fromEmail);
        helper.setTo(email);
        helper.setSubject("Your TrojApp Account Has Been Deregistered");

        String htmlContent = "<html><body style='font-family: Arial, sans-serif; color: #333;'>"
                + "<div style='background-color: #f5f5f5; padding: 20px;'>"
                + "<div style='max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px;'>"

                // Header with logo and website name
                + "<div style='text-align: center;'>"
                + "<h2 style='color: #4E65FF;'>Account Deregistration</h2>"
                + "<p style='color: #888;'>TrojApp Account Management</p>"
                + "</div>"

                // Deregistration details
                + "<h3>Your TrojApp Account Has Been Deregistered</h3>"
                + "<p style='font-size: 16px;'>Hello,</p>"
                + "<p style='font-size: 16px;'>Your account has been successfully deregistered from TrojApp. If you did not request this action or believe this was a mistake, please contact us immediately.</p>"

                // Security warning
                + "<div style='margin-top: 20px; padding: 15px; background-color: #ffe0e0; border-left: 5px solid #FF4D4D;'>"
                + "<p style='font-size: 14px; margin: 0;'>If you believe your account has been deregistered without your permission, please contact our support team.</p>"
                + "</div>"

                // Footer with support details
                + "<div style='margin-top: 30px; text-align: center;'>"
                + "<p style='font-size: 14px; color: #888;'>Need help? <a href='mailto:support@trojapp.com' style='color: #4E65FF;'>Contact our support team</a></p>"
                + "<p style='font-size: 12px; color: #aaa;'>© 2024 TrojApp. All rights reserved.</p>"
                + "</div>"

                + "</div>"
                + "</div>"
                + "</body></html>";

        helper.setText(htmlContent, true);

        mailSender.send(message);
    }


    public boolean validateVerificationToken(String token) throws Exception {
        String decodedToken = new String(Base64.getDecoder().decode(token));
        String[] parts = decodedToken.split(":");
        if (parts.length != 2) {
            return false;
        }
        String email = parts[0];
        String otp = parts[1];

        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            String decryptedOtp = new String(Base64.getDecoder().decode(user.getEmailOtp()));
            user.setEmailVerified(true);
            userRepository.save(user);
            return decryptedOtp.equals(otp) && user.getOtpExpiration().isAfter(LocalDateTime.now());
        }
        return false;
    }

    public void deregisterUser(String email) throws MessagingException {
        logger.debug("Deregistering user with email: {}", email);
        Optional<User> user = userRepository.findByEmail(email);
        user.ifPresentOrElse(userRepository::delete, () -> {
            logger.warn("User not found for deregistration with email: {}", email);
            throw new ResourceNotFoundException("User Not Found");
        });
        sendDeregisteredEmail(email);
        logger.info("User deregistered successfully with email: {}", email);
    }

    public void sendForgotPasswordEmail(String email) {
        try {
            String token = Base64.getEncoder().encodeToString((email).getBytes());
            String resetUrl = "http://localhost:3000/reset-password?token=" + token;

            Optional<User> userOptional = userRepository.findByEmail(email);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                userRepository.save(user);
                sendPasswordResetEmail(email, resetUrl);
            } else {
                throw new ResourceNotFoundException("User not found");
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }

    private void sendPasswordResetEmail(String email, String resetUrl) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom(fromEmail);
        helper.setTo(email);
        helper.setSubject("Password Reset for TrojApp");

        String htmlContent = "<html><body style='font-family: Arial, sans-serif; color: #333;'>"
                + "<div style='background-color: #f5f5f5; padding: 20px;'>"
                + "<div style='max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px;'>"
                + "<div style='text-align: center;'>"
                + "<h2 style='color: #4E65FF;'>Password Reset for TrojApp</h2>"
                + "<p style='color: #888;'>Secure Authentication, Simplified</p>"
                + "</div>"
                + "<h3>Reset Your Password</h3>"
                + "<p style='font-size: 16px;'>Hello,</p>"
                + "<p style='font-size: 16px;'>Please click the link below to reset your password:</p>"
                + "<div style='text-align: center; margin-top: 20px;'>"
                + "<a href='" + resetUrl + "' style='background-color: #4E65FF; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>Reset Password</a>"
                + "</div>"
                + "<p style='font-size: 16px; margin-top: 20px;'>This link will expire in <strong>5 minutes</strong>. If you didn’t request this, please ignore this email.</p>"
                + "<div style='margin-top: 20px; padding: 15px; background-color: #eaf7ff; border-left: 5px solid #4E65FF;'>"
                + "<p style='font-size: 14px; margin: 0;'>For your security, only click this link if you requested a password reset. TrojApp will never ask you for personal information via email.</p>"
                + "</div>"
                + "<div style='margin-top: 30px; text-align: center;'>"
                + "<p style='font-size: 14px; color: #888;'>Need help? <a href='mailto:support@trojapp.com' style='color: #4E65FF;'>Contact our support team</a></p>"
                + "<p style='font-size: 12px; color: #aaa;'>© 2024 TrojApp. All rights reserved.</p>"
                + "</div>"
                + "</div>"
                + "</div>"
                + "</body></html>";

        helper.setText(htmlContent, true);

        mailSender.send(message);
    }

    private String generateTemporaryPassword() {
        int length = 6;
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        StringBuilder password = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            password.append(characters.charAt(random.nextInt(characters.length())));
        }
        return password.toString();
    }
}
package com.trojan.loginserver.service;

import com.trojan.loginserver.exception.ResourceNotFoundException;
import com.trojan.loginserver.model.User;
import com.trojan.loginserver.repository.UserRepository;
import com.trojan.loginserver.util.EncryptionUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EncryptionUtil encryptionUtil;

    @Autowired
    private UserService userService;

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
        helper.setSubject("Your OTP Code for Trojan Auth");

        String htmlContent = "<html><body>"
                + "<h1>Your OTP Code</h1>"
                + "<p>Your OTP code is: <strong>" + otp + "</strong></p>"
                + "<p>This code will expire in 5 minutes.</p>"
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
}
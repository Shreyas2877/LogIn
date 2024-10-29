// src/main/java/com/trojan/loginserver/service/UserService.java
package com.trojan.loginserver.service;

import com.trojan.loginserver.dto.SecretResponse;
import com.trojan.loginserver.exception.DatabaseException;
import com.trojan.loginserver.exception.ResourceNotFoundException;
import com.trojan.loginserver.model.MfaStatus;
import com.trojan.loginserver.model.User;
import com.trojan.loginserver.model.UserProfile;
import com.trojan.loginserver.repository.UserRepository;
import com.trojan.loginserver.util.EncryptionUtil;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

/*
 * @author: shreyas raviprakash
 * */

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CookieService cookieService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private EncryptionUtil encryptionUtil = new EncryptionUtil();

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void registerUser(String email, String password, String userName) {
        String provider = "local";
        logger.debug("Registering user with email: {}", email);
        String encodedPassword = passwordEncoder.encode(password);
        try {
            userRepository.save(new User(email, encodedPassword, userName, provider, false, MfaStatus.FALSE, false));
            logger.info("User registered successfully with email: {}", email);
            emailService.sendWelcomeEmail(email);
        } catch (Exception e) {
            logger.error("Error saving user to database for email: {}", email, e);
            throw new DatabaseException("Error saving user to database");
        }
    }

    public boolean userExists(String email) {
        logger.debug("Checking if user exists with email: {}", email);
        boolean exists = userRepository.findByEmail(email).isPresent();
        logger.info("User exists with email: {}: {}", email, exists);
        return exists;
    }

    public UserProfile loginUser(String email, String password, HttpServletResponse response) {
        logger.debug("Attempting login for user with email: {}", email);
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            logger.info("Login successful for user with email: {}", email);
            if(!user.get().getMfaEnabled().equals(MfaStatus.TRUE)){
                setJwt(response, user);
            }
            return user.get().getUserProfile();
        }
        logger.warn("Login failed for user with email: {}", email);
        throw new ResourceNotFoundException("User not found");
    }

    public UserProfile saveOAuthUser(String email, String userName, String provider) {
        logger.debug("Saving OAuth user with email: {}", email);
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setEmailVerified(true);
            userRepository.save(user);
            logger.info("User already exists with email: {}", email);
            return existingUser.get().getUserProfile();
        }
        try {
            return userRepository.save(new User(email, null, userName, provider, true, MfaStatus.DISABLED, false)).getUserProfile();
        } catch (Exception e) {
            logger.error("Error saving OAuth user to database for email: {}", email, e);
            throw new DatabaseException("Error saving OAuth user to database");
        }
    }

    public UserProfile getUserName(String email){
        logger.debug("Fetching user profile for email: {}", email);
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isPresent()){
            logger.info("User profile fetched successfully for email: {}", email);
            return user.get().getUserProfile();
        }
        logger.warn("User not found for fetching profile with email: {}", email);
        throw new ResourceNotFoundException("User Not Found");
    }

    public void setJwt(HttpServletResponse response, Optional<User> existingUser) {
        User loggedInUser = existingUser.get();
        String token = jwtService.generateToken(loggedInUser.getEmail(), loggedInUser.getId());

        Cookie cookie = cookieService.createCookie("jwt_access", token, 86400); // 1 day in seconds
        response.addCookie(cookie);
    }

    public boolean validateOtp(String email, String otp, HttpServletResponse response) throws Exception {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            String decryptedOtp = encryptionUtil.decrypt(user.getEmailOtp());
            if(decryptedOtp.equals(otp) && user.getOtpExpiration().isAfter(LocalDateTime.now())) {
                User loggedInUser = userOptional.get();
                String token = jwtService.generateToken(loggedInUser.getEmail(), loggedInUser.getId());
                Cookie cookie = cookieService.createCookie("jwt_access", token, 86400); // 1 day in seconds
                response.addCookie(cookie);
                return true;
            }
        }
        return false;
    }

    public void updateMfa(String email, MfaStatus mfaEnabled) {
        logger.debug("Updating MFA status for user with email: {}", email);
        Optional<User> user = userRepository.findByEmail(email);
        user.ifPresentOrElse(u -> {
            u.setMfaEnabled(mfaEnabled);
            userRepository.save(u);
            logger.info("MFA status updated successfully for user with email: {}", email);
        }, () -> {
            logger.warn("User not found for updating MFA status with email: {}", email);
            throw new ResourceNotFoundException("User Not Found");
        });
    }

    public void updatePassword(String email, String password) {
        logger.debug("Updating password for user with email: {}", email);
        Optional<User> user = userRepository.findByEmail(email);
        user.ifPresentOrElse(u -> {
            u.setPassword(passwordEncoder.encode(password));
            userRepository.save(u);
            try {
                emailService.sendPasswordResetConfirmationEmail(email);
            } catch (MessagingException e) {
                throw new ResourceNotFoundException("Error sending email");
            }
            logger.info("Password updated successfully for user with email: {}", email);
        }, () -> {
            logger.warn("User not found for updating password with email: {}", email);
            throw new ResourceNotFoundException("User Not Found");
        });
    }

    public void saveSecret(String email, String secret) {
        logger.debug("Saving secret for user with email: {}", email);
        Optional<User> user = userRepository.findByEmail(email);
        user.ifPresentOrElse(u -> {
            u.setQrCodeSecret(secret);
            u.setQrCodeEnabled(true);
            userRepository.save(u);
            logger.info("Secret saved successfully for user with email: {}", email);
        }, () -> {
            logger.warn("User not found for saving secret with email: {}", email);
            throw new ResourceNotFoundException("User Not Found");
        });
    }

    public SecretResponse getSecret(String email) {
        logger.debug("Fetching secret for user with email: {}", email);
        Optional<User> user = userRepository.findByEmail(email);
        SecretResponse secretResponse = new SecretResponse();
        if(user.isPresent()){
            logger.info("Secret fetched successfully for user with email: {}", email);
            secretResponse.setSecret(user.get().getQrCodeSecret());
            secretResponse.setId(user.get().getId());
            return secretResponse;
        }
        logger.warn("User not found for fetching secret with email: {}", email);
        throw new ResourceNotFoundException("User Not Found");
    }
}
// src/main/java/com/trojan/loginserver/service/UserService.java
package com.trojan.loginserver.service;

import com.trojan.loginserver.exception.DatabaseException;
import com.trojan.loginserver.exception.ResourceNotFoundException;
import com.trojan.loginserver.model.MfaStatus;
import com.trojan.loginserver.model.User;
import com.trojan.loginserver.model.UserProfile;
import com.trojan.loginserver.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CookieService cookieService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void registerUser(String email, String password, String userName) {
        String Provider = "local";
        logger.debug("Registering user with email: {}", email);
        String encodedPassword = passwordEncoder.encode(password);
        try {
            userRepository.save(new User(email, encodedPassword, userName, Provider, false, MfaStatus.FALSE));
            logger.info("User registered successfully with email: {}", email);
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

    public Optional<User> loginUser(String email, String password) {
        logger.debug("Attempting login for user with email: {}", email);
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            logger.info("Login successful for user with email: {}", email);
            return user;
        }
        logger.warn("Login failed for user with email: {}", email);
        throw new ResourceNotFoundException("User not found");
    }

    public void deregisterUser(String email) {
        logger.debug("Deregistering user with email: {}", email);
        Optional<User> user = userRepository.findByEmail(email);
        user.ifPresentOrElse(userRepository::delete, () -> {
            logger.warn("User not found for deregistration with email: {}", email);
            throw new ResourceNotFoundException("User Not Found");
        });
        logger.info("User deregistered successfully with email: {}", email);
    }

    public UserProfile saveOAuthUser(String email, String userName, String provider) {
        logger.debug("Saving OAuth user with email: {}", email);
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            logger.info("User already exists with email: {}", email);
            return existingUser.get().getUserProfile();
        }
        try {
            return userRepository.save(new User(email, null, userName, provider, true, MfaStatus.DISABLED)).getUserProfile();
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

        Cookie cookie = cookieService.createCookie("jwt", token, 86400); // 1 day in seconds
        response.addCookie(cookie);
    }

    public Optional<User> getUserWithEmail(String email){
        logger.debug("Fetching user with email: {}", email);
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isPresent()){
            logger.info("User fetched successfully with email: {}", email);
            return user;
        }
        logger.warn("User not found with email: {}", email);
        throw new ResourceNotFoundException("User Not Found");
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
}
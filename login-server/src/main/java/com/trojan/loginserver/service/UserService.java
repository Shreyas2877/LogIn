// src/main/java/com/trojan/loginserver/service/UserService.java
package com.trojan.loginserver.service;

import com.trojan.loginserver.exception.DatabaseException;
import com.trojan.loginserver.exception.ResourceNotFoundException;
import com.trojan.loginserver.model.User;
import com.trojan.loginserver.model.UserProfile;
import com.trojan.loginserver.repository.UserRepository;
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

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void registerUser(String email, String password, String userName) {
        String Provider = "local";
        logger.debug("Registering user with email: {}", email);
        String encodedPassword = passwordEncoder.encode(password);
        try {
            userRepository.save(new User(email, encodedPassword, userName, Provider));
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
            return userRepository.save(new User(email, null, userName, provider)).getUserProfile();
        } catch (Exception e) {
            logger.error("Error saving OAuth user to database for email: {}", email, e);
            throw new DatabaseException("Error saving OAuth user to database");
        }
    }
}
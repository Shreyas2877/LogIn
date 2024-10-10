// src/main/java/com/app/service/UserService.java
package com.trojan.loginserver.service;

import com.trojan.loginserver.model.User;
import com.trojan.loginserver.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void registerUser(String email, String password) {
        // Encrypt password
        String encodedPassword = passwordEncoder.encode(password);
        try {
            User user = userRepository.save(new User(email, encodedPassword));
        }catch(Exception e){
            System.out.println(Arrays.toString(e.getStackTrace()));
        }
    }

    public Optional<User> loginUser(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            return user;
        }
        return Optional.empty();
    }

    public void deregisterUser(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        user.ifPresent(userRepository::delete);
    }
}

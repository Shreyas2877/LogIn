// src/test/java/com/trojan/loginserver/service/UserServiceTest.java
package com.trojan.loginserver.service;

import com.trojan.loginserver.exception.ResourceNotFoundException;
import com.trojan.loginserver.model.User;
import com.trojan.loginserver.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testUserExists_UserExists() {
        String email = "test@example.com";
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(new User()));

        boolean exists = userService.userExists(email);

        assertTrue(exists);
    }

    @Test
    void testUserExists_UserDoesNotExist() {
        String email = "test@example.com";
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        boolean exists = userService.userExists(email);

        assertFalse(exists);
    }

    @Test
    void testRegisterUser() {
        String email = "test@example.com";
        String password = "password";
        User user = new User();
        user.setEmail(email);
        user.setPassword(password);

        userService.registerUser(email, password);

        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testLoginUser_Failure() {
        String email = "test@example.com";
        String password = "wrongpassword";

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(new User()));

        assertThrows(ResourceNotFoundException.class, () -> userService.loginUser(email, password));
    }
}
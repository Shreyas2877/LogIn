// src/test/java/com/trojan/loginserver/service/UserServiceTest.java
package com.trojan.loginserver.service;

import com.trojan.loginserver.model.User;
import com.trojan.loginserver.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    void testRegisterUser() {
        String email = "test@example.com";
        String password = "password";
        String userName = "testUser";

        userService.registerUser(email, password, userName);

        verify(userRepository, times(1)).save(any(User.class));
    }
}
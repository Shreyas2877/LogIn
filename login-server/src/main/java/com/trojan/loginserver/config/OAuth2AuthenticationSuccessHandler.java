package com.trojan.loginserver.config;

import com.trojan.loginserver.service.JwtService;
import com.trojan.loginserver.service.CookieService;
import com.trojan.loginserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CookieService cookieService;

    @Autowired
    private UserService userService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");

        // Register or update the user in the database
        userService.registerUser(email, "DummyPassword");

        // Generate JWT
        String token = jwtService.generateToken(email, userService.getUserId(email));

        // Create and add cookie
        Cookie cookie = cookieService.createCookie("jwt", token, 86400); // 1 day in seconds
        response.addCookie(cookie);

        // Redirect to the specified URL
        response.sendRedirect("http://localhost:3000/profile");
    }
}
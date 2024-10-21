// src/main/java/com/trojan/oauthserver/controller/JwtController.java
package com.trojan.oauthserver.controller;

import com.trojan.oauthserver.service.JwtService;
import com.trojan.oauthserver.service.CookieService;
import com.trojan.oauthserver.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Map;

@RestController
public class JwtController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CookieService cookieService;

    @Autowired
    private UserService userService;

    @GetMapping("/generate-jwt")
    public void generateJwt(@AuthenticationPrincipal OAuth2User principal, HttpServletResponse response) throws IOException {
        String email = principal.getAttribute("email");
        String userName = principal.getAttribute("name");
        String provider = principal.getAttribute("provider");

        // Save the user and get the response
        Map<String, Object> responseBody = userService.saveUser(email, userName, provider);
        Long id = Long.valueOf((Integer) responseBody.get("id"));

        // Generate the JWT
        String token = jwtService.generateToken(email, id);
        Cookie jwtCookie = cookieService.createCookie("jwt", token, 86400); // 1 day in seconds

        response.addCookie(jwtCookie);
        response.sendRedirect("http://localhost:3000/profile");
    }
}
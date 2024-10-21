// src/main/java/com/trojan/oauthserver/controller/JwtController.java
package com.trojan.oauthserver.controller;

import com.trojan.oauthserver.service.JwtService;
import com.trojan.oauthserver.service.CookieService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class JwtController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CookieService cookieService;

    @GetMapping("/generate-jwt")
    public void generateJwt(@AuthenticationPrincipal OAuth2User principal, HttpServletResponse response) throws IOException {
        String email = principal.getAttribute("login") != null ? principal.getAttribute("login") : principal.getAttribute("email");
        Long id = Long.valueOf(1234567);

        String token = jwtService.generateToken(email, id);
        Cookie jwtCookie = cookieService.createCookie("jwt", token, 86400); // 1 day in seconds

        response.addCookie(jwtCookie);
        response.sendRedirect("http://localhost:3000/profile");
    }
}
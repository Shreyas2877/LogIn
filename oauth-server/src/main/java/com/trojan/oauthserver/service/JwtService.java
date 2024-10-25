// src/main/java/com/trojan/loginserver/service/JwtService.java
package com.trojan.oauthserver.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {

    private static final long EXPIRATION_TIME = 86400000; // 1 day in milliseconds

    @Autowired
    private Environment env;

    private String getSecretKey() {
        return env.getProperty("jwt.secret");
    }

    public String generateToken(String email, Long id) {
        return Jwts.builder()
                .setSubject(email)
                .claim("id", id)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, getSecretKey())
                .compact();
    }

    public Claims validateToken(String token) {
        return Jwts.parser()
                .setSigningKey(getSecretKey())
                .parseClaimsJws(token)
                .getBody();
    }
}
// src/main/java/com/trojan/loginserver/service/CookieService.java
package com.trojan.loginserver.service;

import jakarta.servlet.http.Cookie;
import org.springframework.stereotype.Service;

@Service
public class CookieService {

    public Cookie createCookie(String name, String value, int maxAge) {
        Cookie cookie = new Cookie(name, value);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(maxAge);
        cookie.setSecure(true);
        return cookie;
    }

    public Cookie deleteCookie(String name) {
        Cookie cookie = new Cookie(name, "");
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        cookie.setSecure(true);
        return cookie;
    }
}
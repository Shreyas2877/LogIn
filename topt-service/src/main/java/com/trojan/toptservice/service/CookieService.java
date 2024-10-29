package com.trojan.toptservice.service;

import jakarta.servlet.http.Cookie;
import org.springframework.stereotype.Service;

/*
 * @author: shreyas raviprakash
 * */

@Service
public class CookieService {

    public Cookie createCookie(String name, String value, int maxAge) {
        Cookie cookie = new Cookie(name, value);
        cookie.setPath("/");
        cookie.setMaxAge(maxAge);
        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        return cookie;
    }

//    public Cookie deleteCookie(String name) {
//        Cookie cookie = new Cookie(name, "");
//        cookie.setPath("/");
//        cookie.setMaxAge(0);
//        cookie.setSecure(true);
//        cookie.setHttpOnly(true);
//        return cookie;
//    }
}
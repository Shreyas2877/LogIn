// src/main/java/com/trojan/loginserver/dto/LoginRequest.java
package com.trojan.loginserver.dto;

/*
 * @author: shreyas raviprakash
 * */

public class LoginRequest {
    private String email;
    private String password;

    // Getters and setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
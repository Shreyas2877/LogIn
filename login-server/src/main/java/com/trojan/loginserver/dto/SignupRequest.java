// src/main/java/com/trojan/loginserver/dto/SignupRequest.java
package com.trojan.loginserver.dto;

/*
 * @author: shreyas raviprakash
 * */

public class SignupRequest {
    private String email;
    private String password;
    private String userName;

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

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

}
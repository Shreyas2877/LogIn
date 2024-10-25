// src/main/java/com/trojan/loginserver/dto/OAuthRequest.java
package com.trojan.loginserver.dto;

/*
 * @author: shreyas raviprakash
 * */

public class OAuthRequest {

    private String email;

    private String userName;

    private String provider;

    // Getters and setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }
}
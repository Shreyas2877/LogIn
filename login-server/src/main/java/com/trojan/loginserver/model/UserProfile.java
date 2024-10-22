// src/main/java/com/trojan/loginserver/model/UserProfile.java
package com.trojan.loginserver.model;

public class UserProfile {
    private String email;
    private Long id;
    private String userName;

    public UserProfile(String email, Long id) {
        this.email = email;
        this.id = id;
    }

    public UserProfile(String email, Long id, String userName) {
        this.email = email;
        this.id = id;
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public Long getId() {
        return id;
    }

    public String getuserName() {
        return userName;
    }
}
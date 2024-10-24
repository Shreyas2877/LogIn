// src/main/java/com/trojan/loginserver/model/UserProfile.java
package com.trojan.loginserver.model;

public class UserProfile {
    private String email;
    private Long id;
    private String user;
    private boolean emailVerified;
    private MfaStatus mfaEnabled;


    public UserProfile(String email, Long id, String user, boolean emailVerified, MfaStatus mfaEnabled) {
        this.email = email;
        this.id = id;
        this.user = user;
        this.emailVerified = emailVerified;
        this.mfaEnabled = mfaEnabled;
    }

    public String getEmail() {
        return email;
    }

    public Long getId() {
        return id;
    }


    public void setEmail(String email) {
        this.email = email;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public boolean isEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    public MfaStatus getMfaEnabled() {
        return mfaEnabled;
    }

    public void setMfaEnabled(MfaStatus mfaEnabled) {
        this.mfaEnabled = mfaEnabled;
    }
}
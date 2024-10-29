package com.trojan.loginserver.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/*
 * @author: shreyas raviprakash
 * */

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true, unique = true)
    private String email;

    @Column(nullable = true)
    private String password;

    @Column(nullable = false)
    private String userName;

    @Column(nullable = true)
    private String provider;

    @Column(nullable = false)
    private LocalDateTime registrationTime;

    @Column(nullable = true)
    private String emailOtp;

    @Column(nullable = true)
    private LocalDateTime otpExpiration;

    @Column
    private boolean emailVerified;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MfaStatus mfaEnabled;

    @Column
    private String qrCodeSecret;

    @Column
    private boolean qrCodeEnabled;

    public User() {
        this.registrationTime = LocalDateTime.now();
        this.emailVerified = false;
        this.mfaEnabled = MfaStatus.FALSE;
        this.qrCodeEnabled = false;
    }

    public User(String email, String password, String userName, String provider, boolean emailVerified, MfaStatus mfaEnabled, boolean qrCodeEnabled) {
        this.email = email;
        this.qrCodeEnabled = qrCodeEnabled;
        this.password = password;
        this.userName = userName;
        this.provider = provider;
        this.emailVerified = emailVerified;
        this.mfaEnabled = mfaEnabled;
        this.registrationTime = LocalDateTime.now();
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public LocalDateTime getRegistrationTime() {
        return registrationTime;
    }

    public void setRegistrationTime(LocalDateTime registrationTime) {
        this.registrationTime = registrationTime;
    }

    public UserProfile getUserProfile() {
        return new UserProfile(this.email, this.id, this.userName ,this.emailVerified, this.mfaEnabled, this.qrCodeEnabled);
    }

    public String getEmailOtp() {
        return emailOtp;
    }

    public void setEmailOtp(String emailOtp) {
        this.emailOtp = emailOtp;
    }

    public LocalDateTime getOtpExpiration() {
        return otpExpiration;
    }

    public void setOtpExpiration(LocalDateTime otpExpiration) {
        this.otpExpiration = otpExpiration;
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

    public String getUserName() {
        return userName;
    }

    public String getQrCodeSecret() {
        return qrCodeSecret;
    }

    public void setQrCodeSecret(String qrCodeSecret) {
        this.qrCodeSecret = qrCodeSecret;
    }

    public boolean isQrCodeEnabled() {
        return qrCodeEnabled;
    }

    public void setQrCodeEnabled(boolean qrCodeEnabled) {
        this.qrCodeEnabled = qrCodeEnabled;
    }
}
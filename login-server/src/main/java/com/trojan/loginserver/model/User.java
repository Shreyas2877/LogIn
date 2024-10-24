// src/main/java/com/trojan/loginserver/model/User.java
        package com.trojan.loginserver.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

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

    public User() {
        this.registrationTime = LocalDateTime.now();
    }

    public User(String email, String password, String userName, String provider) {
        this.email = email;
        this.password = password;
        this.userName = userName;
        this.provider = provider;
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

    public LocalDateTime getRegistrationTime() {
        return registrationTime;
    }

    public void setRegistrationTime(LocalDateTime registrationTime) {
        this.registrationTime = registrationTime;
    }

    public UserProfile getUserProfile() {
        return new UserProfile(this.email, this.id);
    }
}
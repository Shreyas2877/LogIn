package com.trojan.loginserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class LoginServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(LoginServerApplication.class, args);
    }

}

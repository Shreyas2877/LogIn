package com.trojan.loginserver.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authorize -> authorize
                        // Permit login and signup without authentication
                        .requestMatchers(new AntPathRequestMatcher("/api/auth/login")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/auth/signup")).permitAll()

                        // Apply OAuth2 only to the /profile endpoint
                        .requestMatchers(new AntPathRequestMatcher("/api/auth/profile")).permitAll()

                        // Permit all other API endpoints
                        .requestMatchers(new AntPathRequestMatcher("/api/**")).permitAll()

                )
                // Enable OAuth2 login only for the authenticated requests
                .oauth2Login().successHandler(oAuth2AuthenticationSuccessHandler());

        // Enable CORS and disable CSRF
        http.cors().and().csrf().disable();

        return http.build();
    }

    @Bean
    public AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler() {
        return new OAuth2AuthenticationSuccessHandler();
    }
}
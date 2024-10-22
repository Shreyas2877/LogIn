// src/main/java/com/trojan/oauthserver/service/UserService.java
package com.trojan.oauthserver.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    public Map<String, Object> saveUser(String email, String userName, String provider) {
        // Prepare the request body
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("email", email);
        requestBody.put("userName", userName);
        requestBody.put("provider", provider);

        // Make the HTTP POST request to save the user
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, String>> request = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> responseEntity = restTemplate.exchange(
                "http://localhost:8080/api/auth/saveUser",
                HttpMethod.POST,
                request,
                Map.class
        );

        // Return the response body
        return responseEntity.getBody();
    }
}
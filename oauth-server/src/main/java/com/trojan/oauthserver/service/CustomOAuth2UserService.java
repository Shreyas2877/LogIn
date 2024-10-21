// src/main/java/com/trojan/oauthserver/service/CustomOAuth2UserService.java
package com.trojan.oauthserver.service;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        // Add the provider attribute
        Map<String, Object> attributes = new HashMap<>(oAuth2User.getAttributes());
        String provider = userRequest.getClientRegistration().getRegistrationId();
        attributes.put("provider", provider);

        return new DefaultOAuth2User(oAuth2User.getAuthorities(), attributes, "name");
    }
}
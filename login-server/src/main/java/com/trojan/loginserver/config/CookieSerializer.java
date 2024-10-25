package com.trojan.loginserver.config;

import org.springframework.context.annotation.Bean;
import org.springframework.session.web.http.DefaultCookieSerializer;


public class CookieSerializer {
    @Bean
    public DefaultCookieSerializer cookieSerializer() {
        DefaultCookieSerializer cookieSerializer = new DefaultCookieSerializer();
        cookieSerializer.setSameSite("Lax");
        return cookieSerializer;
    }
}
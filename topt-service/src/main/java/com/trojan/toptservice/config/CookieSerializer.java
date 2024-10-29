package com.trojan.toptservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.session.web.http.DefaultCookieSerializer;

/*
 * @author: shreyas raviprakash
 * */

public class CookieSerializer {
    @Bean
    public DefaultCookieSerializer cookieSerializer() {
        DefaultCookieSerializer cookieSerializer = new DefaultCookieSerializer();
        cookieSerializer.setSameSite("Lax");
        return cookieSerializer;
    }
}
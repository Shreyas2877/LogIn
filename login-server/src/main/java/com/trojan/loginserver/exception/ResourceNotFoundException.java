package com.trojan.loginserver.exception;

/*
 * @author: shreyas raviprakash
 * */

public class ResourceNotFoundException extends RuntimeException{
    public ResourceNotFoundException(String message) {
        super(message);
    }
}

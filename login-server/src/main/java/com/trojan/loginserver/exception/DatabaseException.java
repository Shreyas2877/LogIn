package com.trojan.loginserver.exception;

/*
 * @author: shreyas raviprakash
 * */

public class DatabaseException extends RuntimeException {
    public DatabaseException(String message) {
        super(message);
    }
}

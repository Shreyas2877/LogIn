// src/context/LoginContext.js
import React, { createContext, useState } from 'react';

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [hasLoggedIn, setHasLoggedIn] = useState(false);

    return (
        <LoginContext.Provider value={{ hasLoggedIn, setHasLoggedIn }}>
            {children}
        </LoginContext.Provider>
    );
};
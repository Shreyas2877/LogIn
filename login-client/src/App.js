// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppRoutes from './routes';
import NavBar from './components/NavBar';
import { AuthProvider } from './context/AuthContext';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const App = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <AuthProvider>
            <CssBaseline />
            <Router>
                <NavBar />
                <div>
                    <AppRoutes />
                </div>
            </Router>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;
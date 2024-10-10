// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppRoutes from './routes';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const App = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Router>
                <div>
                    <AppRoutes />
                </div>
            </Router>
        </ThemeProvider>
    );
};

export default App;
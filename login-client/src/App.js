import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, CssBaseline, createTheme } from '@material-ui/core';
import NavBar from './components/NavBar';
import AppRoutes from './routes/index';
import Background from './styles/Background'; // Import the Background component

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const Footer = () => (
    <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        padding: '8px 16px', // Adjust padding for a better fit
        color: 'white',
        zIndex: 2,
        fontSize: '0.8rem', // Smaller font size
        textAlign: 'center', // Center align the text
    }}>
        © 2023 Shreyas - Troj Auth
    </div>
);

const App = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div
                style={{
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: '100vh',
                }}
            >
                <Background /> {/* Add the Background component */}
                <div
                    style={{
                        position: 'relative',
                        zIndex: 1,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed',
                        minHeight: '100vh',
                    }}
                >
                    <Router>
                        <NavBar />
                        <div>
                            <AppRoutes />
                        </div>
                    </Router>
                </div>
                <Footer /> {/* Add the Footer component */}
            </div>
        </ThemeProvider>
    );
};

export default App;

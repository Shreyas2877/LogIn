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
            </div>
        </ThemeProvider>
    );
};

export default App;
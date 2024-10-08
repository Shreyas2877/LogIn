// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';

const App = () => {
    return (
        <Router>
            <div>
                <h1>Login Application</h1>
                <AppRoutes />
            </div>
        </Router>
    );
};

export default App;

// src/components/NavBar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logoutController } from '../controllers/authController';

const NavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isProfilePage = location.pathname === '/profile';

    const handleLogout = async () => {
        const result = await logoutController();
        if (result.success) {
            navigate('/', { state: { message: 'Logout successful' } }); // Redirect to home page with message
        } else {
            console.error(result.message || 'Logout failed');
        }
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
                >
                    MyApp
                </Typography>
                <Box>
                    {isProfilePage ? (
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/login">
                                Login
                            </Button>
                            <Button color="inherit" component={Link} to="/signup">
                                Sign Up
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
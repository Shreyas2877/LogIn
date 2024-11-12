// src/components/NavBar.js
import React from 'react';
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logoutController } from '../controllers/authController';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const NavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isProfilePage = location.pathname === '/profile';
    const isChatPage = location.pathname === '/chat';
    const isHomePage = location.pathname === '/';
    const isLoginPage = location.pathname === '/login';
    const isSignUpPage = location.pathname === '/signup';

    const handleLogout = async () => {
        const result = await logoutController();
        if (result.success) {
            navigate('/', { state: { message: 'Logout successful', fromLogout: true } }); // Redirect to home page with message
        } else {
            console.error(result.message || 'Logout failed');
        }
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(10px)' }}>
            <Toolbar>
                {!isProfilePage && !isChatPage && (
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="home"
                        component={Link}
                        to="/"
                        style={{ display: isProfilePage || isChatPage ? 'none' : 'inline-flex' }}
                    >
                        <HomeIcon />
                    </IconButton>
                )}
                <Box flexGrow={1} />
                {(isProfilePage || isChatPage) ? (
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="logout"
                        onClick={handleLogout}
                    >
                        <LogoutIcon />
                    </IconButton>
                ) : (
                    <>
                        {(isHomePage || isLoginPage || isSignUpPage) && (
                            <>
                                <IconButton color="inherit" component={Link} to="/login">
                                    <LoginIcon />
                                </IconButton>
                                <IconButton color="inherit" component={Link} to="/signup">
                                    <PersonAddIcon />
                                </IconButton>
                            </>
                        )}
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
// src/components/NavBar.js
import React, { useContext } from 'react';
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logoutController } from '../controllers/authController';
import { AuthContext } from '../context/AuthContext';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const NavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);
    const isProfilePage = location.pathname === '/profile';

    const handleLogout = async () => {
        const result = await logoutController();
        if (result.success) {
            setIsAuthenticated(false);
            navigate('/', { state: { message: 'Logout successful' } }); // Redirect to home page with message
        } else {
            console.error(result.message || 'Logout failed');
        }
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    component={Link}
                    to="/"
                    sx={{ mr: 2 }}
                >
                    <HomeIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                <Box>
                    {isProfilePage ? (
                        <IconButton color="inherit" onClick={handleLogout}>
                            <LogoutIcon />
                        </IconButton>
                    ) : (
                        <>
                            <IconButton color="inherit" component={Link} to="/login">
                                <LoginIcon />
                            </IconButton>
                            <IconButton color="inherit" component={Link} to="/signup">
                                <PersonAddIcon />
                            </IconButton>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
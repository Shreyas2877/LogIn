// src/components/NavBar.js
import React, { useContext } from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logoutController } from '../controllers/authController';
import { AuthContext } from '../context/AuthContext';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'; // Import the HomeRoundedIcon
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

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
        <AppBar position="static" 
        sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent black
            backdropFilter: 'blur(10px)', // Smokey effect
            WebkitBackdropFilter: 'blur(10px)', // For Safari
            color: 'white', // Text color
        }}>
            <Toolbar>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                    <HomeRoundedIcon sx={{ fontSize: 40 }} /> {/* Replace T with HomeRoundedIcon */}
                </Link>
                <Box sx={{ flexGrow: 1 }} />
                <Box>
                    {isProfilePage ? (
                        <Button color="inherit" onClick={handleLogout}>
                        <LogoutRoundedIcon sx={{ fontSize: 30 }} /> {/* Replace Logout text with LogoutRoundedIcon */}
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
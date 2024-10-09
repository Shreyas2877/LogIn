import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginController } from '../controllers/authController'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await loginController(email, password);
        if(result.success){
            navigate('/home');
        }
        else{
            setError(result.message || "Login Failed!")
        }
    }

    return(
        <div>
        <h2>Login</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
        </form>
    </div>
    )
}

export default Login;
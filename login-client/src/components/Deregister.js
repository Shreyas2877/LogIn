// src/components/Deregister.js
import React, { useState } from 'react';
import { deregisterController } from '../controllers/authController';

const Deregister = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await deregisterController(email);
        if (result.success) {
            setSuccess('Deregistered successfully');
            setEmail('');
        } else {
            setError(result.message || 'Deregistration failed');
        }
    };

    return (
        <div>
            <h2>Deregister</h2>
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Deregister</button>
            </form>
        </div>
    );
};

export default Deregister;

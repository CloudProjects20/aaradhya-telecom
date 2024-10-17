// src/pages/login.js
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth'

export default function Login() {
    const { signIn } = useAuth();
    const [email, setEmail] = useState('test@gmail.com');
    const [password, setPassword] = useState('testuser');

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(email)
        try {
            const user = await signIn(email, password);
            alert('Login successful', user);
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

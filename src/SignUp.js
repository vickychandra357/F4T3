// Signup.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from './store';

const Signup=()=> {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = () => {
    // Validate form inputs
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are mandatory');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Generate access token
    const accessToken = generateAccessToken();

    // Create user object
    const user = {
      name,
      email,
      password,
      accessToken,
    };

    // Save user data in local storage
    localStorage.setItem('user', JSON.stringify(user));

    // Dispatch action to set user in Redux store
    dispatch(setUser(user));
    

    // Show success message
    setSuccess('Signup successful');

    // Reset form inputs
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');

    // Redirect to profile page
    navigate('/profile');
  };

  const generateAccessToken = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let accessToken = '';
    for (let i = 0; i < 16; i++) {
      accessToken += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return accessToken;
  };

  return (
    <div className='signup-container'>
      <h1>Signup</h1>
      
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;

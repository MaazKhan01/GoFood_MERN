import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onLogin}) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', {
        username: formData.username,
        password: formData.password,
      });

      // Assuming the server responds with a JWT token upon successful login
      const { token } = response.data;

      // Store the token in a cookie or local storage for future requests
      // (Don't forget to set an expiration time and secure your token storage)
      localStorage.setItem('token', token);

      // Call the onLogin function to update the authenticated state in your app
      onLogin();
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <button type="submit">Log In</button>
    </form>
  );
};

export default LoginForm;

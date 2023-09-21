import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Define your GraphQL mutation here
    const mutation = `
      mutation SignupUser($username: String!, $email: String!, $password: String!) {
        signup(username: $username, email: $email, password: $password) {
          id
          username
          email
        }
      }
    `;

    try {
      const response = await axios.post('http://localhost:4000/graphql', {
        query: mutation,
        variables: {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
      });

      // Handle the response as needed
      console.log('User signed up:', response.data.data.signup);
    } catch (error) {
      console.error('Error signing up:', error);
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
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;

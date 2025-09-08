import './LoginView.module.css';

import axios from 'axios';
import AuthService from '../../services/AuthService';
import Notification from '../../components/Notification/Notification';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

export default function LoginView() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    AuthService.login({ username, password })
      .then((response) => {
        const user = response.data.user;
        const token = response.data.token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);

        setUser(user);

        navigate('/');
      })
      .catch((error) => {
        const message = error.response?.data?.message || 'Login failed.';
        setNotification({ type: 'error', message: message });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <div className="form">
      <h1 className="login-title">Login</h1>

      <Notification notification={notification} clearNotification={() => setNotification(null)} />

      <form onSubmit={handleSubmit}>
        <div className="login-username-section">
          <label htmlFor="username" className="field-label">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            required
            autoFocus
            autoComplete="username"
            placeholder="Enter your username"
            onChange={event => setUsername(event.target.value)}
          />
        </div>

        <div className="password-section">
          <label htmlFor="password" className="field-label">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            required
            placeholder="Enter your password"
            onChange={event => setPassword(event.target.value)}
          />
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </button> <br /><br />

        <div className="register-link">
          <Link to="/register">New? Register here!</Link>
        </div>
      </form>
    </div>
  );
}
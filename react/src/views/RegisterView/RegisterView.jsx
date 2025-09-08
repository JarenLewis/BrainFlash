import AuthService from '../../services/AuthService';
import Notification from '../../components/Notification/Notification';
import styles from './RegisterView.module.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterView() {
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    if (password !== confirmPassword) {
      setNotification({ type: 'error', message: 'Passwords do not match.' });
      setIsSubmitting(false);
      return;
    }

    AuthService.register({
      username,
      password,
      confirmPassword,
      role: 'user',
    })
      .then(() => {
        setNotification({ type: 'success', message: 'Registration successful' });
        navigate('/login');
      })
      .catch((error) => {
        const message = error.response?.data?.message || 'Registration failed.';
        setNotification({ type: 'error', message: message });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <div className={styles.form}>
      <h1 className={styles['register-title']}>Register</h1>

      <Notification
        notification={notification}
        clearNotification={() => setNotification(null)}
      />

      <form onSubmit={handleSubmit}>
        <div className={styles['username-section']}>
          <label htmlFor="username" className={styles['field-label']}>Username</label>
          <input
            type="text"
            id="username"
            value={username}
            required
            autoFocus
            autoComplete="username"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={styles['password-section']}>
          <label htmlFor="password" className={styles['field-label']}>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            required
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles['confirm-password-section']}>
          <label htmlFor="confirmPassword" className={styles['field-label']}>Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            required
            placeholder="Re-enter your password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className={styles['submit-button']}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>

        <div className={styles['register-link']}>
          <Link to="/login">Have an account? Log in here!</Link>
        </div>
      </form>
    </div>
  );
}
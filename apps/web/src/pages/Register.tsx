import { toast } from 'react-hot-toast';
import { HeaderGuest } from '../components/HeaderGuest';
import { api } from '../utils/api';
import { useEffect } from 'react';
import { useLocation } from 'wouter';

export const Register = () => {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (token) {
      toast.success('Already logged in');
      setLocation('/stack', { replace: true });
    }
  }, [setLocation]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      event.currentTarget.password.value !==
      event.currentTarget.repeatpassword.value
    ) {
      toast.error('Passwords do not match');
      return;
    }

    const response = await api.post('/auth/register', {
      username: event.currentTarget.username.value,
      password: event.currentTarget.password.value,
    });

    if (response.data.access_token) {
      toast.success('Registered');
      localStorage.setItem('access_token', response.data.access_token);
      setLocation('/stack');
    }
  };

  return (
    <div>
      <HeaderGuest />
      <div className="auth-layout">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Username
            <input name="username" type="text" required />
          </label>
          <label>
            Password
            <input name="password" type="password" required />
          </label>
          <label>
            Repeat password
            <input name="repeatpassword" type="password" required />
          </label>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

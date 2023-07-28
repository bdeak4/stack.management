import { toast } from 'react-hot-toast';
import { Header } from '../components/Header';
import { api } from '../utils/api';
import { useEffect } from 'react';
import { useLocation } from 'wouter';

export const LoginPage = () => {
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

    const response = await api.post('/auth/login', {
      username: event.currentTarget.username.value,
      password: event.currentTarget.password.value,
    });

    if (response.data.access_token) {
      toast.success('Logged in');
      localStorage.setItem('access_token', response.data.access_token);
      setLocation('/stack');
    }
  };

  return (
    <div>
      <Header />
      <div className="auth-layout">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Username
            <input name="username" type="text" required />
          </label>
          <label>
            Password
            <input name="password" type="password" required />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

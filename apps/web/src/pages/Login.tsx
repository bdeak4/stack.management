import { toast } from 'react-hot-toast';
import { Header } from '../components/Header';
import { api } from '../utils/api';
import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { JwtResponse } from '../types';

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

    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      username: HTMLInputElement;
      password: HTMLInputElement;
    };

    await toast.promise(
      api.post<never, JwtResponse>('/auth/login', {
        username: formElements.username.value,
        password: formElements.password.value,
      }),
      {
        loading: 'Logging in...',
        success: ({ access_token }) => {
          localStorage.setItem('access_token', access_token);
          setLocation('/stack');

          return 'Logged in';
        },
        error: (error) => error,
      },
    );
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

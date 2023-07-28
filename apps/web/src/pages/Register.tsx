import { toast } from 'react-hot-toast';
import { Header } from '../components/Header';
import { api } from '../utils/api';
import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { JwtResponse } from '../types';

export const RegisterPage = () => {
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
      repeatpassword: HTMLInputElement;
    };

    if (formElements.password.value !== formElements.repeatpassword.value) {
      toast.error('Passwords do not match');
      return;
    }

    await toast.promise(
      api.post<never, JwtResponse>('/auth/register', {
        username: formElements.username.value,
        password: formElements.password.value,
      }),
      {
        loading: 'Registering...',
        success: ({ access_token }) => {
          localStorage.setItem('access_token', access_token);
          setLocation('/stack');

          return 'Registered';
        },
        error: (error) => error,
      },
    );
  };

  return (
    <div>
      <Header />
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

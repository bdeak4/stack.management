import { useLocation } from 'wouter';
import { api } from '../utils/api';
import { capitalize } from '../utils/string';
import { useEffect } from 'react';

export enum AuthFormType {
  Register = 'register',
  Login = 'login',
}

type Props = {
  type: AuthFormType;
};

export const AuthForm: React.FC<Props> = ({ type }) => {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (token) {
      setLocation('/stack', { replace: true });
    }
  }, [setLocation]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await api.post(`/auth/${type}`, {
      username: event.currentTarget.username.value,
      password: event.currentTarget.password.value,
    });

    localStorage.setItem('access_token', response.data.access_token);
    setLocation('/stack');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username
        <input name="username" type="text" required />
      </label>
      <label>
        Password
        <input name="password" type="password" required />
      </label>
      <button type="submit">{capitalize(type)}</button>
    </form>
  );
};

import { api } from '../utils/api';
import { capitalize } from '../utils/string';

export enum AuthFormType {
  Register = 'register',
  Login = 'login',
}

type Props = {
  type: AuthFormType;
};

export const AuthForm: React.FC<Props> = ({ type }) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const json = await api.post(`/auth/${type}`, {
      username: event.currentTarget.username.value,
      password: event.currentTarget.password.value,
    });

    console.log(json);
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

import { AuthForm, AuthFormType } from '../components/AuthForm';

export const Login = () => {
  return (
    <div>
      <h1>stack.management</h1>
      <AuthForm type={AuthFormType.Login} />
    </div>
  );
};
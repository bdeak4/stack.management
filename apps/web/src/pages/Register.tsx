import { AuthForm, AuthFormType } from '../components/AuthForm';

export const Register = () => {
  return (
    <div>
      <h1>stack.management</h1>
      <AuthForm type={AuthFormType.Register} />
    </div>
  );
};

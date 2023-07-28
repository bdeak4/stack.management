import { Link } from 'wouter';
import { Path } from '../constants/paths';

export const Home = () => {
  return (
    <div>
      <h1>stack.management</h1>
      <Link href={Path.Login}>Login</Link>
    </div>
  );
};

import { Link } from 'wouter';
import { Path } from '../constants/paths';

export const Home = () => {
  return (
    <div>
      <header>
        <Link href={Path.Home} className="highlight">
          stack.management
        </Link>
        <nav>
          <Link href={Path.Register}>Register</Link>
          <Link href={Path.Login}>Login</Link>
        </nav>
      </header>

      <h1>the worst todo app ever.</h1>
    </div>
  );
};

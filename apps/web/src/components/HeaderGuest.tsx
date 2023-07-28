import { Link } from 'wouter';
import { Path } from '../constants/paths';

export const HeaderGuest = () => {
  return (
    <header className="guest">
      <Link href={Path.Home} className="highlight">
        stack.management
      </Link>
      <nav>
        <Link href={Path.Register}>Register</Link>
        <Link href={Path.Login}>Login</Link>
      </nav>
    </header>
  );
};

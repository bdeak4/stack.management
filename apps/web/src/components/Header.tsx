import { Link, useLocation } from 'wouter';
import { Path } from '../constants/paths';
import { toast } from 'react-hot-toast';
import { parseJwt } from '../utils/jtw';
import { useSyncExternalStore } from 'react';

const localstorageSubscribe = (listener: (e: StorageEvent) => unknown) => {
  window.addEventListener('storage', listener);
  return () => {
    window.removeEventListener('storage', listener);
  };
};

const getSnapshot = () => {
  return localStorage.getItem('access_token');
};

export const Header = () => {
  const [, setLocation] = useLocation();
  const token = useSyncExternalStore(localstorageSubscribe, getSnapshot);

  if (!token) {
    return (
      <header className="guest">
        <Link href={Path.Home} className="highlight">
          stack.management
        </Link>
        <nav>
          <a href="https://github.com/bdeak4/stack.management" target="_blank">
            Github
          </a>
          <Link href={Path.Register}>Register</Link>
          <Link href={Path.Login}>Login</Link>
        </nav>
      </header>
    );
  }

  const jwt = parseJwt(token);

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    toast.success('Logged out');
    localStorage.removeItem('access_token');
    setLocation(Path.Home);
  };

  return (
    <header className="user">
      <Link href={Path.Stacks} className="highlight-secondary">
        stack.management
      </Link>
      <nav>
        <Link href={`/${jwt.username}`}>{jwt.username}</Link>
        <a href="" onClick={handleLogout}>
          Logout
        </a>
      </nav>
    </header>
  );
};

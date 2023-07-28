import { Link, useLocation } from 'wouter';
import { Path } from '../constants/paths';
import { toast } from 'react-hot-toast';

export const HeaderUser = () => {
  const [, setLocation] = useLocation();

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    toast.success('Logged out');
    localStorage.removeItem('access_token');
    setLocation(Path.Home);
  };

  return (
    <header className="user">
      <Link href={Path.Home} className="highlight">
        stack.management
      </Link>
      <nav>
        <a href="" onClick={handleLogout}>
          Logout
        </a>
      </nav>
    </header>
  );
};

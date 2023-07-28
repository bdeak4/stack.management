import { useRoute } from 'wouter';
import { Path } from '../constants/paths';
import { HeaderGuest } from '../components/HeaderGuest';

export const NotFound = () => {
  const [, params] = useRoute(Path.CatchAll);

  return (
    <div>
      <HeaderGuest />
      <h1>404</h1>
      I'm not a teapot. Page /{params?.path} not found.
    </div>
  );
};

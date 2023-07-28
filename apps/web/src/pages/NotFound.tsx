import { useRoute } from 'wouter';
import { Path } from '../constants/paths';

export const NotFound = () => {
  const [, params] = useRoute(Path.CatchAll);

  return (
    <div>
      <h1>404</h1>
      Sorry, but /{params?.path} doesn't exist.
    </div>
  );
};

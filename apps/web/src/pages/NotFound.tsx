import { useRoute } from 'wouter';
import { Path } from '../constants/paths';
import { Header } from '../components/Header';

export const NotFoundPage = () => {
  const [, params] = useRoute(Path.CatchAll);

  return (
    <div>
      <Header />
      <h1>404</h1>
      I'm not a teapot. Page /{params?.path} not found.
    </div>
  );
};

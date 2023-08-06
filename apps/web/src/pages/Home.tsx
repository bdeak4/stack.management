import { Header } from '../components/Header';

export const HomePage = () => {
  return (
    <div>
      <Header />

      <h1 className="title">
        low distraction todo app that helps you{' '}
        <span className="highlight">prioritize and focus</span>
      </h1>

      <p>Try it! It's free (and always will be)</p>
    </div>
  );
};

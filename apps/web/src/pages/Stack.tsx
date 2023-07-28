import useSWR from 'swr';
import { Header } from '../components/Header';
import { api } from '../utils/api';
import { AxiosResponse } from 'axios';
import { Link, useLocation } from 'wouter';
import clsx from 'clsx';
import type { Stack } from '../types';
import { NotFoundPage } from './NotFound';

export const StackPage = () => {
  const { data, isLoading } = useSWR<AxiosResponse>('/stack', api.get);
  const [location, setLocation] = useLocation();

  if (isLoading) {
    return (
      <div>
        <Header />
        Loading...
      </div>
    );
  }

  const activeStackId = +location.split('/')[2];

  if (!activeStackId) {
    setLocation(`/stack/${data?.data[0].id}`);
  }

  if (!data?.data.some((stack: Stack) => stack.id === activeStackId)) {
    return <NotFoundPage />;
  }

  return (
    <div>
      <Header />

      <div className="stack-header">
        <ul className="stack-list">
          {data?.data.map((stack: Stack) => (
            <li key={stack.id}>
              <Link
                href={`/stack/${stack.id}`}
                className={clsx({
                  highlight: activeStackId === stack.id,
                  'highlight-none': activeStackId !== stack.id,
                })}
              >
                {stack.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="stack-header-buttons">
          <button>Add stack</button>
          <button>Remove stack</button>
        </div>
      </div>

      <div className="stack-content">stack content</div>
    </div>
  );
};

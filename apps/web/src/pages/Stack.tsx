import useSWR from 'swr';
import { Header } from '../components/Header';
import { api } from '../utils/api';
import { AxiosResponse } from 'axios';
import { Link, useLocation } from 'wouter';
import clsx from 'clsx';
import { Stack } from '../types';
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

  const stack: Stack = data?.data.find(
    (stack: Stack) => stack.id === activeStackId,
  );

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
        <div className="stack-buttons">
          <button>&#43;</button>
          <button>rm</button>
        </div>
      </div>

      <form className="stack-add">
        <input name="content" type="text" placeholder="Task" />
        <button>&#43;</button>
      </form>

      <ul className="task-list">
        {stack.tasks.map((task) => (
          <li key={task.id}>
            <div className="content">{task.content}</div>
            <div className="stack-buttons">
              <button className="move">mv</button>
              <button>rm</button>
            </div>
          </li>
        ))}
      </ul>

      {stack.tasks.length === 0 &&
        (stack._count.tasks === 0 ? (
          <div>Add first task to {stack.name} stack</div>
        ) : (
          <div>Stack zero. Good job!</div>
        ))}
    </div>
  );
};

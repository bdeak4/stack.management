import { Header } from '../components/Header';
import { Link, useLocation } from 'wouter';
import clsx from 'clsx';
import { NotFoundPage } from './NotFound';
import { api } from '../utils/api';
import { Stack, Task } from '../types';
import { useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-hot-toast';

const compareStacks = (a: Stack, b: Stack) => {
  if (a.name > b.name) return 1;
  if (a.name < b.name) return -1;
  return 0;
};

export const StackPage = () => {
  const [location, setLocation] = useLocation();
  const queryClient = useQueryClient();

  const { data: stacks, isLoading } = useQuery('stack', () =>
    api.get<never, Stack[]>('/stack'),
  );

  if (isLoading) {
    return (
      <div>
        <Header />
        Loading...
      </div>
    );
  }

  const stackId = +location.split('/')[2] || stacks?.[0].id;

  const stack = stacks?.find((stack) => stack.id === stackId);

  if (!stack) {
    return <NotFoundPage />;
  }

  const handleCreateStack = async () => {
    const name = prompt('Stack name:');

    await toast.promise(api.post<never, Stack>('/stack', { name }), {
      loading: 'Creating stack...',
      success: (stack) => {
        queryClient.setQueryData<Stack[]>('stack', (stacks = []) =>
          [...stacks, stack].sort(compareStacks),
        );

        setLocation(`/stack/${stack.id}`);

        return 'Stack created';
      },
      error: (error) => error,
    });
  };

  const handleDeleteStack = async () => {
    if (!confirm('Are you sure?')) return;

    await toast.promise(api.delete(`/stack/${stackId}`), {
      loading: 'Deleting stack...',
      success: () => {
        queryClient.setQueryData<Stack[]>('stack', (stacks = []) =>
          stacks.filter((stack) => stack.id !== stackId),
        );

        setLocation('/stack');

        return 'Stack deleted';
      },
      error: (error) => error,
    });
  };

  const handleCreateTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      content: HTMLInputElement;
    };

    await toast.promise(
      api.post<never, Task>(`/stack/${stackId}/task`, {
        content: formElements.content.value,
      }),
      {
        loading: 'Creating task...',
        success: (task) => {
          queryClient.setQueryData<Stack[]>('stack', (stacks = []) => {
            return stacks.map((stack) =>
              stack.id === stackId
                ? { ...stack, tasks: [task, ...stack.tasks] }
                : stack,
            );
          });

          form.reset();

          return 'Task created';
        },
        error: (error) => error,
      },
    );
  };

  const handleDeleteTask = async (taskId: number) => {
    queryClient.setQueryData<Stack[]>('stack', (stacks = []) => {
      return stacks.map((stack) =>
        stack.id === stackId
          ? {
              ...stack,
              tasks: stack.tasks.filter((task) => task.id !== taskId),
            }
          : stack,
      );
    });

    await toast.promise(api.delete(`/stack/${stackId}/task/${taskId}`), {
      loading: 'Deleting task...',
      success: 'Task deleted',
      error: (error) => error,
    });
  };

  return (
    <div>
      <Header />

      <div className="stack-header">
        <ul className="stack-list">
          {stacks!.map((stack) => (
            <li key={stack.id}>
              <Link
                href={`/stack/${stack.id}`}
                className={clsx({
                  highlight: stackId === stack.id,
                  'highlight-none': stackId !== stack.id,
                })}
              >
                {stack.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="stack-buttons">
          <button type="button" onClick={handleCreateStack}>
            &#43;
          </button>
          <button type="button" onClick={handleDeleteStack}>
            rm
          </button>
        </div>
      </div>

      <form className="stack-add" onSubmit={handleCreateTask}>
        <input
          name="content"
          type="text"
          placeholder="Task"
          autoComplete="off"
          required
        />
        <button type="submit">&#43;</button>
      </form>

      <ul className="task-list">
        {stack.tasks.map((task) => (
          <li key={task.id}>
            <div className="content">{task.content}</div>
            <div className="stack-buttons">
              <button type="button" className="move">
                mv
              </button>
              <button type="button" onClick={() => handleDeleteTask(task.id)}>
                rm
              </button>
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

import { useQuery } from 'react-query';
import { Header } from '../components/Header';
import { useRoute } from 'wouter';
import { Path } from '../constants/paths';
import { UserStats } from '../types';
import { api } from '../utils/api';
import { NotFoundPage } from './NotFound';

export const ProfilePage = () => {
  const [, params] = useRoute(Path.CatchAll);
  const username = params?.path;

  const { data: stats, isLoading } = useQuery(
    ['stats', username],
    () => api.get<never, UserStats>(`/user/${username}/stats`),
    { retry: false },
  );

  if (isLoading) {
    return (
      <div>
        <Header />
        Loading...
      </div>
    );
  }

  if (!stats) {
    return <NotFoundPage />;
  }

  const daysSinceRegistration = Math.round(
    Math.abs(+new Date() - +new Date(stats.registrationDate)) / 8.64e7,
  );
  const avgTasksPerDay = (
    stats.completedTasksCount / daysSinceRegistration
  ).toFixed(1);

  return (
    <div>
      <Header />
      <h1>{username}</h1>
      Completed {stats.completedTasksCount} tasks in {daysSinceRegistration}{' '}
      days. Average of <span className="highlight">{avgTasksPerDay}</span> tasks
      per day.
    </div>
  );
};

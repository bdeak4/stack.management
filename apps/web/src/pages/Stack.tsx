import useSWR from 'swr';
import { HeaderUser } from '../components/HeaderUser';
import { api } from '../utils/api';

export const Stack = () => {
  const { data } = useSWR('/auth/whoami', api.get);

  return (
    <div>
      <HeaderUser />
      stacks
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

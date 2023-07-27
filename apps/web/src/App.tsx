import { Route, Switch } from 'wouter';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Stack } from './pages/Stack';
import { NotFound } from './pages/NotFound';
import { Path } from './routes';

export const App = () => {
  return (
    <Switch>
      <Route path={Path.Home} component={Home} />
      <Route path={Path.Login} component={Login} />
      <Route path={Path.Stack} component={Stack} />
      <Route path={Path.CatchAll} component={NotFound} />
    </Switch>
  );
};

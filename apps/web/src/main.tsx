import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Switch } from 'wouter';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';
import { StackPage } from './pages/Stack';
import { NotFoundPage } from './pages/NotFound';
import { Path } from './constants/paths';
import { Toaster } from 'react-hot-toast';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Switch>
      <Route path={Path.Home} component={HomePage} />
      <Route path={Path.Login} component={LoginPage} />
      <Route path={Path.Register} component={RegisterPage} />
      <Route path={Path.Stack} component={StackPage} />
      <Route path={Path.Stacks} component={StackPage} />
      <Route path={Path.CatchAll} component={NotFoundPage} />
    </Switch>
    <Toaster toastOptions={{ className: 'notification' }} />
  </React.StrictMode>,
);

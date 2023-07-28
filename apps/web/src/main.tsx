import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Switch } from 'wouter';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Stack } from './pages/Stack';
import { NotFound } from './pages/NotFound';
import { Path } from './constants/paths';
import { Toaster } from 'react-hot-toast';
import './index.css';
import { StackRedirect } from './pages/StackRedirect';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Switch>
      <Route path={Path.Home} component={Home} />
      <Route path={Path.Login} component={Login} />
      <Route path={Path.Register} component={Register} />
      <Route path={Path.Stack} component={Stack} />
      <Route path={Path.StackRedirect} component={StackRedirect} />
      <Route path={Path.CatchAll} component={NotFound} />
    </Switch>
    <Toaster />
  </React.StrictMode>,
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Switch } from 'wouter';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Path } from './constants/paths';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';
import { StackPage } from './pages/Stack';
import { ProfilePage } from './pages/Profile';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path={Path.Home} component={HomePage} />
        <Route path={Path.Login} component={LoginPage} />
        <Route path={Path.Register} component={RegisterPage} />
        <Route path={Path.Stack} component={StackPage} />
        <Route path={Path.Stacks} component={StackPage} />
        <Route path={Path.CatchAll} component={ProfilePage} />
      </Switch>
      <Toaster
        toastOptions={{
          style: {
            border: '1px solid #444',
            borderRadius: '6px',
            backgroundColor: '#222',
            color: '#eee',
          },
          iconTheme: {
            primary: '#fdfd96',
            secondary: '#111',
          },
        }}
      />
    </QueryClientProvider>
  </React.StrictMode>,
);

export enum Path {
  Home = '/',
  Login = '/login',
  Register = '/register',
  Logout = '/logout',
  Stacks = '/stack',
  Stack = '/stack/:id',
  Settings = '/settings',
  CatchAll = '/:path*',
}

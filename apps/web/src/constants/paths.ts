export enum Path {
  Home = '/',
  Login = '/login',
  Register = '/register',
  Logout = '/logout',
  StackRedirect = '/stack',
  Stack = '/stack/:id',
  CatchAll = '/:path*',
}

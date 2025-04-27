import AuthWrapper from './views/layouts/AuthWrapper';
import Dashboard from './views/pages/Dashboard';
import Home from './views/pages/Home';
import Login from './views/pages/Login';

const allRoutesMapper = [
  {
    path: '/',
    component: <Home />,
  },
  {
    path: '/login',
    component: <Login />,
  },
  {
    path: '/dashboard',
    component: (
      <AuthWrapper>
        <Dashboard />
      </AuthWrapper>
    ),
  },
];

export default allRoutesMapper;

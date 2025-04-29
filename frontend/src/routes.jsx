import AuthWrapper from './views/layouts/AuthWrapper';
import Batches from './views/pages/Batches';
import Boards from './views/pages/Boards';
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
  {
    path: '/batches',
    component: (
      <AuthWrapper>
        <Batches />
      </AuthWrapper>
    ),
  },
  {
    path: '/boards',
    component: (
      <AuthWrapper>
        <Boards />
      </AuthWrapper>
    ),
  },
];

export default allRoutesMapper;

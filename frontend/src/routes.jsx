import AuthWrapper from './views/layouts/AuthWrapper';
import Batches from './views/pages/Batches';
import Boards from './views/pages/Boards';
import Dashboard from './views/pages/Dashboard';
import Home from './views/pages/Home';
import Login from './views/pages/Login';
import CreateSubjectPage from './views/pages/subject/CreateSubject';

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
  {
    path: '/subject/create-subject',
    component: (
      <AuthWrapper>
        <CreateSubjectPage />
      </AuthWrapper>
    ),
  },
];

export default allRoutesMapper;

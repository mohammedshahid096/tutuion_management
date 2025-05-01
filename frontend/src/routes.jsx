import AuthWrapper from './views/layouts/AuthWrapper';
import Batches from './views/pages/Batches';
import Boards from './views/pages/Boards';
import PublicBoardsPage from './views/pages/Boards/PublicBoardsPage';
import Dashboard from './views/pages/Dashboard';
import Home from './views/pages/Home';
import Login from './views/pages/Login';
import NotFound from './views/pages/NotFound';
import CreateSubjectPage from './views/pages/subject/CreateSubject';
import PublicChapterDetail from './views/pages/subject/PublicChapterDetail';
import PublicSubjects from './views/pages/subject/PublicSubjects';
import SubjectLists from './views/pages/subject/SubjectLists';

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
    path: '/boards',
    component: <PublicBoardsPage />,
  },
  {
    path: '/subjects/:boardId',
    component: <PublicSubjects />,
  },
  {
    path: '/subjects/:boardId/:subjectId',
    component: <PublicChapterDetail />,
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
    path: '/admin/boards',
    component: (
      <AuthWrapper>
        <Boards />
      </AuthWrapper>
    ),
  },
  {
    path: '/admin/subjects',
    component: (
      <AuthWrapper>
        <SubjectLists />
      </AuthWrapper>
    ),
  },
  {
    path: '/admin/subject/create-subject',
    component: (
      <AuthWrapper>
        <CreateSubjectPage />
      </AuthWrapper>
    ),
  },
  {
    path: '*',
    component: <NotFound />,
  },
];

export default allRoutesMapper;

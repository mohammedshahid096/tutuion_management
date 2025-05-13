import StudentDetails from './views/pages/students/StudentDetails';
import AuthWrapper from './views/layouts/AuthWrapper';
import Batches from './views/pages/batches/Batches';
import Boards from './views/pages/boards/Boards';
import PublicBoardsPage from './views/pages/Boards/PublicBoardsPage';
import Dashboard from './views/pages/Dashboard';
import Home from './views/pages/Home';
import Login from './views/pages/Login';
import NotFound from './views/pages/NotFound';
import ProgressUpdate from './views/pages/students/ProgressUpdate';
import RegisterStudent from './views/pages/students/RegisterStudent';
import StudentsList from './views/pages/students/StudentsList';
import CreateSubjectPage from './views/pages/subject/CreateSubject';
import PublicChapterDetail from './views/pages/subject/PublicChapterDetail';
import PublicSubjects from './views/pages/subject/PublicSubjects';
import SubjectLists from './views/pages/subject/SubjectLists';
import AdminAttendanceMark from './views/pages/attendance/AdminAttendanceMark';
import SubjectEdit from './views/pages/subject/SubjectEdit';
import EditSingleChapter from './views/pages/subject/EditSingleChapter';
import ContactList from './views/pages/contact/ContactList';

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
    path: '/admin/subject/:subjectId',
    component: (
      <AuthWrapper>
        <SubjectEdit />
      </AuthWrapper>
    ),
  },
  {
    path: '/admin/subject/:subjectId/:chapterId',
    component: (
      <AuthWrapper>
        <EditSingleChapter />
      </AuthWrapper>
    ),
  },
  {
    path: '/admin/students/register',
    component: (
      <AuthWrapper>
        <RegisterStudent />
      </AuthWrapper>
    ),
  },
  {
    path: '/admin/students',
    component: (
      <AuthWrapper>
        <StudentsList />
      </AuthWrapper>
    ),
  },
  {
    path: '/admin/students/:studentId',
    component: (
      <AuthWrapper>
        <RegisterStudent />
      </AuthWrapper>
    ),
  },
  {
    path: '/admin/student-details/:studentId/:pageType',
    component: (
      <AuthWrapper>
        <StudentDetails />
      </AuthWrapper>
    ),
  },
  {
    path: '/admin/student-details/:studentId/student-enrollments/:enrollmentId/:subjectId',
    component: (
      <AuthWrapper>
        <ProgressUpdate />
      </AuthWrapper>
    ),
  },
  {
    path: '/admin/mark-attendance',
    component: (
      <AuthWrapper>
        <AdminAttendanceMark />
      </AuthWrapper>
    ),
  },
  {
    path: '/admin/contact-forms',
    component: (
      <AuthWrapper>
        <ContactList />
      </AuthWrapper>
    ),
  },
  {
    path: '*',
    component: <NotFound />,
  },
];

export default allRoutesMapper;

import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthLayout } from '../components/layout/AuthLayout';
import { MainLayout } from '../components/layout/MainLayout';
import { Login } from '../pages/auth/Login';
import { LearnerDashboard } from '../pages/learner/LearnerDashboard';
import { LearnerProfilePage } from '../pages/learner/LearnerProfile';
import { LearnerCompetencyPage } from '../pages/learner/LearnerCompetency';
import { AssessmentPage } from '../pages/learner/AssessmentPage';
import { LearningPathPage } from '../pages/learner/LearningPathPage';
import { LearnerQuizzes } from '../pages/learner/LearnerQuizzes';
import { TrainerDashboard } from '../pages/trainer/TrainerDashboard';
import { TrainerUploadPage } from '../pages/trainer/TrainerUploadPage';
import { TrainerReviewPage } from '../pages/trainer/TrainerReviewPage';
import { TrainerProfile } from '../pages/trainer/TrainerProfile';
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { Unauthorized } from '../pages/errors/Unauthorized';
import { NotFound } from '../pages/errors/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/learner' replace />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
  {
    path: '/learner',
    element: <MainLayout allowedRoles={['learner', 'admin', 'superadmin']} />,
    children: [
      { index: true, element: <LearnerDashboard /> },
      { path: 'profile', element: <LearnerProfilePage /> },
      { path: 'competency', element: <LearnerCompetencyPage /> },
      { path: 'learning-path', element: <LearningPathPage /> },
      { path: 'quizzes', element: <LearnerQuizzes /> },
      { path: 'assessment/:id', element: <AssessmentPage /> },
    ],
  },
  {
    path: '/trainer',
    element: <MainLayout allowedRoles={['trainer', 'admin', 'superadmin']} />,
    children: [
      { index: true, element: <TrainerDashboard /> },
      { path: 'upload', element: <TrainerUploadPage /> },
      { path: 'review', element: <TrainerReviewPage /> },
      { path: 'profile', element: <TrainerProfile /> },
    ],
  },
  {
    path: '/admin',
    element: <MainLayout allowedRoles={['admin', 'superadmin']} />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'users', element: <AdminDashboard defaultTab="users" /> },
      { path: 'health', element: <AdminDashboard defaultTab="health" /> },
    ],
  },
  {
    path: '/unauthorized',
    element: <Unauthorized />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

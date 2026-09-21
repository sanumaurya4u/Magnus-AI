import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthLayout } from '../components/layout/AuthLayout';
import { MainLayout } from '../components/layout/MainLayout';
import { Login } from '../pages/auth/Login';
import { LearnerDashboard } from '../pages/learner/LearnerDashboard';
import { LearnerProfilePage } from '../pages/learner/LearnerProfile';
import { LearnerCompetencyPage } from '../pages/learner/LearnerCompetency';
import { AssessmentPage } from '../pages/learner/AssessmentPage';
import { LearningPathPage } from '../pages/learner/LearningPathPage';
import { TrainerDashboard } from '../pages/trainer/TrainerDashboard';
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
      { path: 'assessment/:id', element: <AssessmentPage /> },
    ],
  },
  {
    path: '/trainer',
    element: <MainLayout allowedRoles={['trainer', 'admin', 'superadmin']} />,
    children: [
      { index: true, element: <TrainerDashboard /> },
    ],
  },
  {
    path: '/admin',
    element: <MainLayout allowedRoles={['admin', 'superadmin']} />,
    children: [
      { index: true, element: <AdminDashboard /> },
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

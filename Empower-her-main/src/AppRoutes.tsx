import { Routes, Route, Outlet } from 'react-router-dom';
import Layout from '@/components/Layout';
import Index from '@/pages/Index';
import SOSPage from '@/pages/SOS';
import MedicalPage from '@/pages/Medical';
import RestroomsPage from '@/pages/Restrooms';
import ResourcesPage from '@/pages/Resources';
import ProfilePage from '@/pages/Profile';
import AuthPage from '@/components/SignIn';
import NotFound from '@/pages/NotFound';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout><Outlet /></Layout>}>
        <Route index element={<Index />} />
        <Route path="sos" element={<SOSPage />} />
        <Route path="medical" element={<MedicalPage />} />
        <Route path="restrooms" element={<RestroomsPage />} />
        <Route path="resources" element={<ResourcesPage />} />

        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route path="sign-in" element={<AuthPage />} />
        <Route path="sign-up" element={<AuthPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;


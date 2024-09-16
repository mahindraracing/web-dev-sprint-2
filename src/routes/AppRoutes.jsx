import { Route, Routes } from 'react-router-dom';

import Home from '../screens/Home'; 
import Admin from '../screens/Admin';
import Error from '../screens/Error';
import Dashboard from '../screens/Dashboard';
import PrivateRoute from './PrivateRoute';
import ContactPage from '@/screens/Contact';
import Lives from '@/screens/Lives';
import StreamPage from '@/screens/StreamPage/StreamPage';

import { AuthProvider } from '../contexts/AuthContext';
import PostDetail from '@/screens/PostDetail';


function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/stream" element={<Lives />} />
        <Route path="/stream/:id" element={<StreamPage />} />
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </AuthProvider>
  );
}

export default AppRoutes;

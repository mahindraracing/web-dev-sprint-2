import { Route, Routes } from 'react-router-dom';
import Home from '../screens/Home'; 
import Admin from '../screens/Admin';
import Error from '../screens/Error';
import Dashboard from '../screens/Dashboard';
import PrivateRoute from './PrivateRoute.jsx'; 
import { AuthProvider } from '../contexts/AuthContext';

function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </AuthProvider>
  );
}

export default AppRoutes;
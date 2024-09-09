import { Route, Routes } from 'react-router-dom';

import Home from '../screens/Home'; 
import Admin from '../screens/Admin'
import Error from '../screens/Error'
import Dashboard from '../screens/Dashboard';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Error />} />
            <Route path="dashboard" element={<Dashboard />} />
        </Routes>
    );
}

export default AppRoutes;
import { Route, Routes } from 'react-router-dom';

import Home from '../screens/Home'; 
import Admin from '../screens/Admin'
import Error from '../screens/Error'

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produtos" element={<Admin />} />
            <Route path="*" element={<Error />} />
        </Routes>
    );
}

export default AppRoutes;
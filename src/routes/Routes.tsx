import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import ChatScreen from '../views/ChatScreen';
import { ProtectedRoutes } from './Routes.protected';

export function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route element={<ProtectedRoutes />}>
                    <Route path="*" element={<ChatScreen />} />
                </Route>
            </Routes>
        </Router>
    );
}

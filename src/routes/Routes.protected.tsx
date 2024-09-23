import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { RootState } from '../reducers/store';
import LoginScreen from '../views/LoginScreen';

const useAuth = () => {
    const { isLogged } = useSelector((state: RootState) => state.Auth);
    return isLogged;
};

export function ProtectedRoutes() {
    const isAuth = useAuth();

    return isAuth ? <Outlet /> : <LoginScreen />;
}

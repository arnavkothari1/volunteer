import React from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import { Login } from '../components/Login';
import { Dashboard } from '../components/Dashboard';
import { PathList } from '../components/PathList';
import { PathDetail } from '../components/PathDetail';

export const Routes: React.FC = () => {
  return (
    <RouterRoutes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/paths" element={<PathList />} />
      <Route path="/paths/:pathId" element={<PathDetail />} />
    </RouterRoutes>
  );
}; 
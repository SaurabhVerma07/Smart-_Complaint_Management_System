import React from 'react';
import { DashboardLayout } from './DashboardLayout';
import { Home, ClipboardList } from 'lucide-react';
import { Outlet } from 'react-router-dom';

export const StaffLayout = () => {
  const navigation = [
    { to: '/staff', icon: Home, label: 'Dashboard' },
    { to: '/staff/assignments', icon: ClipboardList, label: 'Assigned Tasks' },
  ];

  return (
    <DashboardLayout navigation={navigation}>
      <Outlet />
    </DashboardLayout>
  );
};

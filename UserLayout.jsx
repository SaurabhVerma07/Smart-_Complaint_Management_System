import React from 'react';
import { DashboardLayout } from './DashboardLayout';
import { Home, FileText, PlusCircle, Settings } from 'lucide-react';
import { Outlet } from 'react-router-dom';

export const UserLayout = () => {
  const navigation = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/dashboard/complaints', icon: FileText, label: 'My Complaints' },
    { to: '/dashboard/submit', icon: PlusCircle, label: 'Submit Complaint' },
    { to: '/dashboard/profile', icon: Settings, label: 'Profile' },
  ];

  return (
    <DashboardLayout navigation={navigation}>
      <Outlet />
    </DashboardLayout>
  );
};

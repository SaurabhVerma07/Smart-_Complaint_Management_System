import React from 'react';
import { DashboardLayout } from './DashboardLayout';
import { BarChart2, FileText, Users, FolderOpen } from 'lucide-react';
import { Outlet } from 'react-router-dom';

export const AdminLayout = () => {
  const navigation = [
    { to: '/admin', icon: BarChart2, label: 'Overview' },
    { to: '/admin/complaints', icon: FileText, label: 'All Complaints' },
    { to: '/admin/staff', icon: Users, label: 'Manage Staff' },
    { to: '/admin/categories', icon: FolderOpen, label: 'Categories' },
  ];

  return (
    <DashboardLayout navigation={navigation}>
      <Outlet />
    </DashboardLayout>
  );
};

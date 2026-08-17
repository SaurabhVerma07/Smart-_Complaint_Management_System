import React from 'react';
import { complaints } from '../../data/mockData';
import { FileText, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export const AdminDashboard = () => {
  const total = complaints.length;
  const resolved = complaints.filter(c => c.status === 'Resolved').length;
  const pending = complaints.filter(c => ['Pending', 'In Review'].includes(c.status)).length;
  const inProgress = complaints.filter(c => c.status === 'In Progress').length;
  
  // Average resolution time (mock)
  const avgResolutionDays = 2.4;

  const statusData = [
    { name: 'Pending', value: pending, color: '#f59e0b' },
    { name: 'In Progress', value: inProgress, color: '#3b82f6' },
    { name: 'Resolved', value: resolved, color: '#10b981' },
    { name: 'Rejected', value: complaints.filter(c => c.status === 'Rejected').length, color: '#ef4444' },
  ];

  // Group by category
  const categoryCounts = complaints.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {});

  const categoryData = Object.entries(categoryCounts).map(([name, value]) => ({
    name, value
  }));
  
  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308'];

  const StatCard = ({ title, value, subtitle, icon: Icon, colorClass, bgColorClass }) => (
    <div className="card flex items-center gap-4">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${bgColorClass} ${colorClass}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <span className="text-xs text-gray-400">{subtitle}</span>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
          <p className="text-gray-500 text-sm mt-1">System-wide complaint statistics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Complaints" value={total} icon={FileText} colorClass="text-primary-600" bgColorClass="bg-primary-50" />
        <StatCard title="Pending Review" value={pending} icon={Clock} colorClass="text-yellow-600" bgColorClass="bg-yellow-50" />
        <StatCard title="In Progress" value={inProgress} icon={AlertCircle} colorClass="text-blue-600" bgColorClass="bg-blue-50" />
        <StatCard title="Avg Resolution" value={`${avgResolutionDays}d`} subtitle="last 30 days" icon={CheckCircle} colorClass="text-green-600" bgColorClass="bg-green-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Complaints by Status</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Complaints by Category</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

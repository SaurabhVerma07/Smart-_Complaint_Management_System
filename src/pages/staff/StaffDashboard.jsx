import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { complaints } from '../../data/mockData';
import { ClipboardList, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const StaffDashboard = () => {
  const { user } = useAuth();
  
  // Assigned to the logged-in staff member
  const assignedComplaints = complaints.filter(c => c.assignedTo === user?.id);
  
  const total = assignedComplaints.length;
  const resolved = assignedComplaints.filter(c => c.status === 'Resolved').length;
  const pending = assignedComplaints.filter(c => ['Pending', 'In Review'].includes(c.status)).length;
  const inProgress = assignedComplaints.filter(c => c.status === 'In Progress').length;

  const chartData = [
    { name: 'To Review', count: pending, color: '#f59e0b' },
    { name: 'In Progress', count: inProgress, color: '#3b82f6' },
    { name: 'Resolved', count: resolved, color: '#10b981' },
  ];

  const StatCard = ({ title, value, icon: Icon, colorClass, bgColorClass }) => (
    <div className="card flex items-center gap-4">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${bgColorClass} ${colorClass}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Staff Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Overview of tasks assigned to you ({user?.department}).</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Assigned" value={total} icon={ClipboardList} colorClass="text-primary-600" bgColorClass="bg-primary-50" />
        <StatCard title="Action Required" value={pending} icon={AlertCircle} colorClass="text-yellow-600" bgColorClass="bg-yellow-50" />
        <StatCard title="In Progress" value={inProgress} icon={Clock} colorClass="text-blue-600" bgColorClass="bg-blue-50" />
        <StatCard title="Resolved" value={resolved} icon={CheckCircle} colorClass="text-green-600" bgColorClass="bg-green-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Task Status Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Priority Tasks</h2>
          <div className="space-y-4">
            {assignedComplaints
              .filter(c => c.status !== 'Resolved' && c.priority === 'High' || c.priority === 'Critical')
              .slice(0, 4)
              .map((complaint) => (
              <div key={complaint.id} className="flex gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-red-50 flex flex-shrink-0 items-center justify-center text-red-600">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{complaint.title}</p>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{complaint.location}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-100 text-red-800 border border-red-200">
                    {complaint.priority}
                  </span>
                </div>
              </div>
            ))}
            {assignedComplaints.filter(c => c.status !== 'Resolved' && (c.priority === 'High' || c.priority === 'Critical')).length === 0 && (
              <p className="text-center text-gray-500 text-sm py-8">No high priority tasks right now.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

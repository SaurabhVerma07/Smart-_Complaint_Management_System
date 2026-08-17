import React from 'react';
import { complaints } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const UserDashboard = () => {
  const { user } = useAuth();
  
  // Filter mock complaints for the logged-in user
  const userComplaints = complaints.filter(c => c.submittedBy === user?.id);
  
  const total = userComplaints.length;
  const resolved = userComplaints.filter(c => c.status === 'Resolved').length;
  const pending = userComplaints.filter(c => ['Pending', 'In Review'].includes(c.status)).length;
  const inProgress = userComplaints.filter(c => c.status === 'In Progress').length;

  const chartData = [
    { name: 'Pending', count: pending, color: '#f59e0b' },
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
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
          <p className="text-gray-500 text-sm mt-1">Here is the summary of your complaints.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Complaints" value={total} icon={FileText} colorClass="text-primary-600" bgColorClass="bg-primary-50" />
        <StatCard title="Pending" value={pending} icon={Clock} colorClass="text-yellow-600" bgColorClass="bg-yellow-50" />
        <StatCard title="In Progress" value={inProgress} icon={AlertCircle} colorClass="text-blue-600" bgColorClass="bg-blue-50" />
        <StatCard title="Resolved" value={resolved} icon={CheckCircle} colorClass="text-green-600" bgColorClass="bg-green-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Status Overview</h2>
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
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {userComplaints.slice(0, 4).map((complaint) => (
              <div key={complaint.id} className="flex gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-primary-50 flex flex-shrink-0 items-center justify-center text-primary-600">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{complaint.title}</p>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{complaint.category}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    complaint.status === 'Resolved' ? 'bg-green-50 text-green-700' :
                    complaint.status === 'Pending' ? 'bg-yellow-50 text-yellow-700' :
                    'bg-blue-50 text-blue-700'
                  }`}>
                    {complaint.status}
                  </span>
                </div>
              </div>
            ))}
            {userComplaints.length === 0 && (
              <p className="text-center text-gray-500 text-sm py-8">No recent activity.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { complaints } from '../../data/mockData';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/StatusBadge';
import { formatDate } from '../../utils/formatDate';

export const MyComplaints = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [userComplaints, setUserComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = () => {
      setIsLoading(true);
      setTimeout(() => {
        setUserComplaints(complaints.filter(c => c.submittedBy === user?.id));
        setIsLoading(false);
      }, 500);
    };
    fetchComplaints();
  }, [user]);

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Title', accessor: 'title', render: (row) => <span className="font-medium">{row.title}</span> },
    { header: 'Category', accessor: 'category' },
    { header: 'Date', accessor: 'dateSubmitted', render: (row) => formatDate(row.dateSubmitted) },
    { header: 'Priority', accessor: 'priority' },
    { header: 'Status', accessor: 'status', render: (row) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Complaints</h1>
          <p className="text-gray-500 text-sm mt-1">View and track all your submitted complaints.</p>
        </div>
        <button 
          onClick={() => navigate('/dashboard/submit')}
          className="btn-primary"
        >
          Submit New
        </button>
      </div>

      <DataTable 
        columns={columns} 
        data={userComplaints} 
        isLoading={isLoading}
        emptyMessage="You have not submitted any complaints yet."
        onRowClick={(row) => navigate(`/dashboard/complaints/${row.id}`)}
      />
    </div>
  );
};

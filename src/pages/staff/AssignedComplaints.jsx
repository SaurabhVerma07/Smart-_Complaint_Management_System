import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { complaints } from '../../data/mockData';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/StatusBadge';
import { formatDate } from '../../utils/formatDate';

export const AssignedComplaints = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [assignedComplaints, setAssignedComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = () => {
      setIsLoading(true);
      setTimeout(() => {
        setAssignedComplaints(complaints.filter(c => c.assignedTo === user?.id));
        setIsLoading(false);
      }, 500);
    };
    fetchComplaints();
  }, [user]);

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Title', accessor: 'title', render: (row) => <span className="font-medium">{row.title}</span> },
    { header: 'Location', accessor: 'location' },
    { header: 'Date', accessor: 'dateSubmitted', render: (row) => formatDate(row.dateSubmitted) },
    { header: 'Priority', accessor: 'priority', render: (row) => (
      <span className={
        row.priority === 'High' || row.priority === 'Critical' ? 'text-red-600 font-medium' : 
        row.priority === 'Medium' ? 'text-yellow-600' : 'text-green-600'
      }>
        {row.priority}
      </span>
    )},
    { header: 'Status', accessor: 'status', render: (row) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assigned Tasks</h1>
          <p className="text-gray-500 text-sm mt-1">Complaints currently assigned to you.</p>
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={assignedComplaints} 
        isLoading={isLoading}
        emptyMessage="No tasks currently assigned to you."
        onRowClick={(row) => navigate(`/staff/complaints/${row.id}`)}
      />
    </div>
  );
};

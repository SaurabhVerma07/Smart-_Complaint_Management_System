import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { complaints, staff, departments } from '../../data/mockData';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/StatusBadge';
import { Modal } from '../../components/Modal';
import { useToast } from '../../context/ToastContext';
import { formatDate } from '../../utils/formatDate';

export const AllComplaints = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState('');

  useEffect(() => {
    const fetchComplaints = () => {
      setIsLoading(true);
      setTimeout(() => {
        setData(complaints);
        setIsLoading(false);
      }, 500);
    };
    fetchComplaints();
  }, []);

  const handleAssignClick = (e, row) => {
    e.stopPropagation(); // Prevent row click
    setSelectedComplaint(row);
    setSelectedStaff(row.assignedTo || '');
    setIsAssignModalOpen(true);
  };

  const handleAssignSubmit = (e) => {
    e.preventDefault();
    if (!selectedStaff) return;

    // Mock update
    setData(prev => prev.map(c => 
      c.id === selectedComplaint.id 
        ? { ...c, assignedTo: selectedStaff, status: c.status === 'Pending' ? 'In Review' : c.status }
        : c
    ));
    
    showToast(`Complaint assigned to staff ID: ${selectedStaff}`);
    setIsAssignModalOpen(false);
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Title', accessor: 'title', render: (row) => <span className="font-medium">{row.title}</span> },
    { header: 'Category', accessor: 'category' },
    { header: 'Date', accessor: 'dateSubmitted', render: (row) => formatDate(row.dateSubmitted) },
    { header: 'Status', accessor: 'status', render: (row) => <StatusBadge status={row.status} /> },
    { header: 'Assigned To', accessor: 'assignedTo', render: (row) => 
        row.assignedTo ? (
          <span className="text-sm text-gray-700">{staff.find(s => s.id === row.assignedTo)?.name || row.assignedTo}</span>
        ) : (
          <span className="text-sm text-gray-400 italic">Unassigned</span>
        )
    },
    { header: 'Action', render: (row) => (
      <button 
        onClick={(e) => handleAssignClick(e, row)}
        className="text-primary-600 hover:text-primary-800 text-sm font-medium"
      >
        Assign
      </button>
    )}
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Complaints</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and assign citizen complaints.</p>
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={data} 
        isLoading={isLoading}
        emptyMessage="No complaints found in the system."
        onRowClick={(row) => navigate(`/admin/complaints/${row.id}`)}
      />

      <Modal 
        isOpen={isAssignModalOpen} 
        onClose={() => setIsAssignModalOpen(false)}
        title={`Assign Complaint ${selectedComplaint?.id}`}
      >
        <form onSubmit={handleAssignSubmit} className="space-y-4">
          <p className="text-sm text-gray-600">
            Select a staff member to handle the issue: <span className="font-medium text-gray-900">{selectedComplaint?.title}</span>
          </p>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Staff Member</label>
            <select 
              className="input-field" 
              required
              value={selectedStaff}
              onChange={e => setSelectedStaff(e.target.value)}
            >
              <option value="">Select Staff...</option>
              {staff.map(s => (
                <option key={s.id} value={s.id}>{s.name} ({s.department})</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button type="button" className="btn-secondary" onClick={() => setIsAssignModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn-primary">Assign</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

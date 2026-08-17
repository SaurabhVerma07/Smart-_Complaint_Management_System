import React, { useState, useEffect } from 'react';
import { staff, departments } from '../../data/mockData';
import { DataTable } from '../../components/DataTable';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/Modal';
import { isValidEmail, isRequired } from '../../utils/validation';

export const ManageStaff = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({ name: '', email: '', department: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchStaff = () => {
      setIsLoading(true);
      setTimeout(() => {
        setData(staff);
        setIsLoading(false);
      }, 500);
    };
    fetchStaff();
  }, []);

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name', render: (row) => <span className="font-medium text-gray-900">{row.name}</span> },
    { header: 'Email', accessor: 'email' },
    { header: 'Department', accessor: 'department' },
    { header: 'Actions', render: (row) => (
      <div className="flex gap-3">
        <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">Edit</button>
        <button 
          className="text-red-600 hover:text-red-800 text-sm font-medium"
          onClick={() => {
            setData(data.filter(s => s.id !== row.id));
            showToast('Staff member removed');
          }}
        >
          Remove
        </button>
      </div>
    )}
  ];

  const handleAddSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!isRequired(formData.name)) newErrors.name = 'Name is required';
    if (!isValidEmail(formData.email)) newErrors.email = 'Invalid email format';
    if (!isRequired(formData.department)) newErrors.department = 'Department is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    
    showToast('Staff member added successfully! (Mock)');
    setIsModalOpen(false);
    setFormData({ name: '', email: '', department: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Staff</h1>
          <p className="text-gray-500 text-sm mt-1">Add, edit, or remove staff members.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary">Add Staff</button>
      </div>

      <DataTable 
        columns={columns} 
        data={data} 
        isLoading={isLoading}
        emptyMessage="No staff members found."
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Staff">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              required 
              className={`input-field ${errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
              placeholder="Jane Doe" 
              value={formData.name}
              onChange={e => {
                setFormData({...formData, name: e.target.value});
                if (errors.name) setErrors({...errors, name: null});
              }}
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              required 
              className={`input-field ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
              placeholder="jane@example.com" 
              value={formData.email}
              onChange={e => {
                setFormData({...formData, email: e.target.value});
                if (errors.email) setErrors({...errors, email: null});
              }}
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select 
              className={`input-field ${errors.department ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
              required
              value={formData.department}
              onChange={e => {
                setFormData({...formData, department: e.target.value});
                if (errors.department) setErrors({...errors, department: null});
              }}
            >
              <option value="">Select Department...</option>
              {departments.map(d => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
            {errors.department && <p className="mt-1 text-xs text-red-600">{errors.department}</p>}
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button 
              type="submit" 
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={Object.keys(errors).some(k => errors[k])}
            >
              Add Staff
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

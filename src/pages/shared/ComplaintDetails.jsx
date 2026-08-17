import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { complaints, staff as staffList } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { StatusBadge } from '../../components/StatusBadge';
import { formatDate, formatDateTime } from '../../utils/formatDate';
import { ArrowLeft, Clock, MapPin, CheckCircle, AlertCircle, Calendar } from 'lucide-react';

export const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();
  
  // Find complaint and setup local state for mock updates
  const initialComplaint = complaints.find(c => c.id === id);
  const [complaint, setComplaint] = useState(initialComplaint);
  const [newStatus, setNewStatus] = useState(complaint?.status || '');
  const [newNote, setNewNote] = useState('');

  if (!complaint) {
    return <div className="p-8 text-center text-gray-500">Complaint not found.</div>;
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    const update = {
      status: newStatus,
      date: new Date().toISOString(),
      note: newNote || `Status updated to ${newStatus}`
    };
    
    setComplaint(prev => ({
      ...prev,
      status: newStatus,
      timeline: [...prev.timeline, update]
    }));
    
    setNewNote('');
    showToast('Complaint updated successfully!');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{complaint.title}</h1>
                <p className="text-sm text-gray-500 mt-1">ID: {complaint.id}</p>
              </div>
              <StatusBadge status={complaint.status} className="px-3 py-1 text-sm" />
            </div>

            <div className="prose max-w-none text-gray-600 mb-8">
              <p>{complaint.description}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Calendar className="w-3 h-3"/> Submitted</p>
                <p className="text-sm font-medium">{formatDate(complaint.dateSubmitted)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><MapPin className="w-3 h-3"/> Location</p>
                <p className="text-sm font-medium">{complaint.location}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Category</p>
                <p className="text-sm font-medium">{complaint.category}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Priority</p>
                <p className="text-sm font-medium">{complaint.priority}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Timeline & Updates</h3>
            <div className="space-y-6">
              {complaint.timeline.map((event, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 z-10">
                      {event.status === 'Resolved' ? <CheckCircle className="w-4 h-4"/> : 
                       event.status === 'Rejected' ? <AlertCircle className="w-4 h-4 text-red-500"/> : 
                       <Clock className="w-4 h-4"/>}
                    </div>
                    {idx !== complaint.timeline.length - 1 && <div className="w-px h-full bg-gray-200 mt-2"></div>}
                  </div>
                  <div className="pb-6">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-gray-900">{event.status}</span>
                      <span className="text-xs text-gray-500">{formatDateTime(event.date)}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{event.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {(user?.role === 'admin' || user?.role === 'staff') && complaint.status !== 'Resolved' && complaint.status !== 'Rejected' && (
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Action Panel</h3>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Update Status</label>
                  <select 
                    className="input-field"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Review">In Review</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Add Note / Resolution</label>
                  <textarea 
                    rows="3" 
                    className="input-field" 
                    placeholder="Describe the action taken..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                  ></textarea>
                </div>
                <button type="submit" className="w-full btn-primary">Save Update</button>
              </form>
            </div>
          )}

          <div className="card bg-gray-50 border-none">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Additional Info</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500">Submitter ID</p>
                <p className="text-sm font-medium text-gray-900">{complaint.submittedBy}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Assigned To</p>
                <p className="text-sm font-medium text-gray-900">
                  {complaint.assignedTo ? `Staff ID: ${complaint.assignedTo}` : 'Unassigned'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

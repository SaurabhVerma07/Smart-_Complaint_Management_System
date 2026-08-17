import React, { useState } from 'react';
import { categories } from '../../data/mockData';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { Upload, MapPin } from 'lucide-react';
import { isRequired } from '../../utils/validation';

export const SubmitComplaint = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    category: categories[0],
    description: '',
    location: '',
    priority: 'Medium',
  });
  const [errors, setErrors] = useState({});
  
  // File upload state
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!isRequired(formData.title)) newErrors.title = 'Title is required';
    if (!isRequired(formData.location)) newErrors.location = 'Location is required';
    if (!isRequired(formData.description)) newErrors.description = 'Description is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    // Simulate API call
    setTimeout(() => {
      showToast('Complaint submitted successfully!');
      navigate('/dashboard/complaints');
    }, 800);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Submit a Complaint</h1>
        <p className="text-gray-500 text-sm mt-1">Provide details about the issue you are facing.</p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Complaint Title</label>
              <input 
                type="text" 
                required 
                className={`input-field ${errors.title ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                placeholder="Briefly describe the issue"
                value={formData.title}
                onChange={e => {
                  setFormData({...formData, title: e.target.value});
                  if (errors.title) setErrors({...errors, title: null});
                }}
              />
              {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select 
                className="input-field"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select 
                className="input-field"
                value={formData.priority}
                onChange={e => setFormData({...formData, priority: e.target.value})}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Location Details</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  required 
                  className={`input-field pl-10 ${errors.location ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                  placeholder="Street name, landmark, etc."
                  value={formData.location}
                  onChange={e => {
                    setFormData({...formData, location: e.target.value});
                    if (errors.location) setErrors({...errors, location: null});
                  }}
                />
              </div>
              {errors.location && <p className="mt-1 text-xs text-red-600">{errors.location}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                required 
                rows="4" 
                className={`input-field ${errors.description ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                placeholder="Provide a detailed description of the issue..."
                value={formData.description}
                onChange={e => {
                  setFormData({...formData, description: e.target.value});
                  if (errors.description) setErrors({...errors, description: null});
                }}
              ></textarea>
              {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image/Document (Optional)</label>
              <div 
                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-xl transition-colors ${isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-500 bg-gray-50/50'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="space-y-1 text-center">
                  <Upload className={`mx-auto h-12 w-12 ${isDragging ? 'text-primary-500' : 'text-gray-400'}`} />
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label className="relative cursor-pointer bg-transparent rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                  {file && (
                    <div className="mt-2 text-sm font-medium text-gray-900 bg-white inline-block px-3 py-1 rounded-md shadow-sm border border-gray-200">
                      Selected: {file.name}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button type="button" className="btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
            <button 
              type="submit" 
              className="btn-primary px-8 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={Object.keys(errors).some(k => errors[k])}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

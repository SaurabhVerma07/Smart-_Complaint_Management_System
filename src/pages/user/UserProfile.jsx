import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { isRequired, isValidPhone } from '../../utils/validation';

export const UserProfile = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleSave = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!isRequired(formData.name)) newErrors.name = 'Name is required';
    if (formData.phone && !isValidPhone(formData.phone)) newErrors.phone = 'Phone must be 10 digits';
    
    if (formData.newPassword || formData.confirmPassword) {
      if (!formData.currentPassword) newErrors.currentPassword = 'Required to change password';
      if (formData.newPassword !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    showToast('Profile updated successfully! (Mock)');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your account details and preferences.</p>
      </div>

      <div className="card">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-4xl">
            {user?.name?.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
            <p className="text-gray-500">{user?.role} Account</p>
            <button className="mt-2 text-sm text-primary-600 font-medium hover:text-primary-700">Change Avatar</button>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                className={`input-field ${errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                value={formData.name}
                onChange={e => {
                  setFormData({...formData, name: e.target.value});
                  if (errors.name) setErrors({...errors, name: null});
                }}
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" className="input-field" defaultValue={user?.email} disabled />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input 
                type="tel" 
                className={`input-field ${errors.phone ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                value={formData.phone}
                placeholder="e.g. 1234567890" 
                onChange={e => {
                  setFormData({...formData, phone: e.target.value});
                  if (errors.phone) setErrors({...errors, phone: null});
                }}
              />
              {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input 
                  type="password" 
                  className={`input-field ${errors.currentPassword ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                  value={formData.currentPassword}
                  onChange={e => {
                    setFormData({...formData, currentPassword: e.target.value});
                    if (errors.currentPassword) setErrors({...errors, currentPassword: null});
                  }}
                />
                {errors.currentPassword && <p className="mt-1 text-xs text-red-600">{errors.currentPassword}</p>}
              </div>
              <div className="hidden md:block"></div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input 
                  type="password" 
                  className="input-field"
                  value={formData.newPassword}
                  onChange={e => setFormData({...formData, newPassword: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <input 
                  type="password" 
                  className={`input-field ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                  value={formData.confirmPassword}
                  onChange={e => {
                    setFormData({...formData, confirmPassword: e.target.value});
                    if (errors.confirmPassword) setErrors({...errors, confirmPassword: null});
                  }}
                />
                {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button 
              type="submit" 
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={Object.keys(errors).some(k => errors[k])}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

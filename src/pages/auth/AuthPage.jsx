import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { isValidEmail, isRequired } from '../../utils/validation';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('citizen@example.com');
  const [password, setPassword] = useState('password123');
  const [fullName, setFullName] = useState('');
  const [errors, setErrors] = useState({});
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate
    const newErrors = {};
    if (!isValidEmail(email)) newErrors.email = 'Invalid email format';
    if (!isRequired(password)) newErrors.password = 'Password is required';
    if (!isLogin && !isRequired(fullName)) newErrors.fullName = 'Full name is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    
    if (isLogin) {
      const result = login(email, password);
      if (result.success) {
        showToast('Login successful!');
        if (result.role === 'admin') navigate('/admin');
        else if (result.role === 'staff') navigate('/staff');
        else navigate('/dashboard');
      } else {
        showToast(result.message, 'error');
      }
    } else {
      showToast('Registration is simulated. Please login with mock credentials.', 'info');
      setIsLogin(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-600/30">
          <span className="text-white font-bold text-3xl">S</span>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          {isLogin ? 'Sign in to SCMS' : 'Create an account'}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Or{' '}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
          >
            {isLogin ? 'register a new account' : 'sign in to your existing account'}
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-gray-200/50 sm:rounded-2xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <div className="mt-1">
                  <input 
                    type="text" 
                    required 
                    className={`input-field ${errors.fullName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                    placeholder="John Doe" 
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors({ ...errors, fullName: null });
                    }}
                  />
                  {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Email address</label>
              <div className="mt-1">
                <input 
                  type="email" 
                  required 
                  className={`input-field ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: null });
                  }}
                />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1">
                <input 
                  type="password" 
                  required 
                  className={`input-field ${errors.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: null });
                  }}
                />
                {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" type="checkbox" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">Forgot password?</a>
              </div>
            </div>

            <div>
              <button 
                type="submit" 
                className="w-full btn-primary flex justify-center py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={Object.keys(errors).some(k => errors[k])}
              >
                {isLogin ? 'Sign in' : 'Register'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Demo Credentials</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-2 text-xs text-gray-600">
              <div className="bg-gray-50 p-2 rounded border border-gray-100 flex justify-between cursor-pointer hover:bg-gray-100" onClick={() => { setEmail('citizen@example.com'); setPassword('password123'); }}>
                <span>Citizen</span> <span>citizen@example.com</span>
              </div>
              <div className="bg-gray-50 p-2 rounded border border-gray-100 flex justify-between cursor-pointer hover:bg-gray-100" onClick={() => { setEmail('admin@example.com'); setPassword('password123'); }}>
                <span>Admin</span> <span>admin@example.com</span>
              </div>
              <div className="bg-gray-50 p-2 rounded border border-gray-100 flex justify-between cursor-pointer hover:bg-gray-100" onClick={() => { setEmail('staff1@example.com'); setPassword('password123'); }}>
                <span>Staff</span> <span>staff1@example.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

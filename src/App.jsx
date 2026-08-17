import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ProtectedRoute } from './routes/ProtectedRoute';

// Auth Pages
import { LandingPage } from './pages/auth/LandingPage';
import { AuthPage } from './pages/auth/AuthPage';

// Layouts
import { UserLayout } from './layouts/UserLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { StaffLayout } from './layouts/StaffLayout';

// Shared
import { ComplaintDetails } from './pages/shared/ComplaintDetails';

// User Pages
import { UserDashboard } from './pages/user/UserDashboard';
import { SubmitComplaint } from './pages/user/SubmitComplaint';
import { MyComplaints } from './pages/user/MyComplaints';
import { UserProfile } from './pages/user/UserProfile';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AllComplaints } from './pages/admin/AllComplaints';
import { ManageStaff } from './pages/admin/ManageStaff';
import { ManageCategories } from './pages/admin/ManageCategories';

// Staff Pages
import { StaffDashboard } from './pages/staff/StaffDashboard';
import { AssignedComplaints } from './pages/staff/AssignedComplaints';

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<AuthPage />} />

            {/* Citizen/User Routes */}
            <Route element={<ProtectedRoute allowedRoles={['citizen']} />}>
              <Route path="/dashboard" element={<UserLayout />}>
                <Route index element={<UserDashboard />} />
                <Route path="submit" element={<SubmitComplaint />} />
                <Route path="complaints" element={<MyComplaints />} />
                <Route path="complaints/:id" element={<ComplaintDetails />} />
                <Route path="profile" element={<UserProfile />} />
              </Route>
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="complaints" element={<AllComplaints />} />
                <Route path="complaints/:id" element={<ComplaintDetails />} />
                <Route path="staff" element={<ManageStaff />} />
                <Route path="categories" element={<ManageCategories />} />
              </Route>
            </Route>

            {/* Staff Routes */}
            <Route element={<ProtectedRoute allowedRoles={['staff']} />}>
              <Route path="/staff" element={<StaffLayout />}>
                <Route index element={<StaffDashboard />} />
                <Route path="assignments" element={<AssignedComplaints />} />
                <Route path="complaints/:id" element={<ComplaintDetails />} />
              </Route>
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;

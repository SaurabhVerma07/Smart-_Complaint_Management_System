import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Clock, CheckCircle } from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">SCMS</span>
          </div>
          <div>
            <Link to="/login" className="btn-primary">Sign In</Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight sm:text-6xl mb-6">
            Smart Complaint <span className="text-primary-600">Management</span>
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto mb-10">
            A unified platform to report, track, and resolve civic issues in real-time. Transparent, fast, and reliable.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/login" className="btn-primary px-8 py-3 text-lg flex items-center gap-2 shadow-lg shadow-primary-600/30">
              Report an Issue <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white py-20 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">How it works</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">1. Submit Securely</h3>
                <p className="text-gray-500">Log in and submit your complaint with photos and location details.</p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 mx-auto bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center mb-6">
                  <Clock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">2. Real-time Tracking</h3>
                <p className="text-gray-500">Track the progress of your complaint through our transparent timeline.</p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 mx-auto bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">3. Swift Resolution</h3>
                <p className="text-gray-500">Assigned staff members resolve the issue and update the status.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-100 py-8 text-center text-gray-500">
        <p>© 2026 Smart Complaint Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { categories } from '../../data/mockData';
import { useToast } from '../../context/ToastContext';
import { isRequired } from '../../utils/validation';

export const ManageCategories = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newCat, setNewCat] = useState('');
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchCategories = () => {
      setIsLoading(true);
      setTimeout(() => {
        setData(categories);
        setIsLoading(false);
      }, 500);
    };
    fetchCategories();
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!isRequired(newCat)) {
      setError('Category name is required');
      return;
    }
    if (data.includes(newCat.trim())) {
      showToast('Category already exists!', 'error');
      return;
    }
    setData([...data, newCat.trim()]);
    setNewCat('');
    setError(null);
    showToast('Category added successfully!');
  };

  const handleRemove = (cat) => {
    setData(data.filter(c => c !== cat));
    showToast(`Category "${cat}" removed.`);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manage Categories</h1>
        <p className="text-gray-500 text-sm mt-1">Add or remove complaint categories.</p>
      </div>

      <div className="card">
        <form onSubmit={handleAdd} className="flex flex-col mb-8 gap-2">
          <div className="flex gap-4">
            <div className="flex-1">
              <input 
                type="text" 
                className={`input-field w-full ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                placeholder="New category name..."
                value={newCat}
                onChange={e => {
                  setNewCat(e.target.value);
                  if (error) setError(null);
                }}
              />
              {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
            </div>
            <button 
              type="submit" 
              className="btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed h-[42px]"
              disabled={!!error}
            >
              Add Category
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <div key={`skeleton-${idx}`} className="h-14 border border-gray-100 rounded-lg bg-gray-50 animate-pulse"></div>
            ))
          ) : data.length > 0 ? (
            data.map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-primary-100 hover:shadow-sm transition-all bg-gray-50/50">
                <span className="font-medium text-gray-700">{cat}</span>
                <button 
                  onClick={() => handleRemove(cat)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full p-8 text-center text-gray-500">
              No categories found. Add one above.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

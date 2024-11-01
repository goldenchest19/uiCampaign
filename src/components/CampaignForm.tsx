import React, { useState } from 'react';
import { Calendar, DollarSign, Target, Globe } from 'lucide-react';

const CampaignForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    budget: '',
    platform: '',
    startDate: '',
    endDate: '',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1074'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, status: 'active', reach: Math.floor(Math.random() * 100000) });
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Campaign</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Campaign Name</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Budget</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                required
                className="pl-10 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Platform</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Globe className="h-5 w-5 text-gray-400" />
              </div>
              <select
                required
                className="pl-10 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
              >
                <option value="">Select Platform</option>
                <option value="Social Media">Social Media</option>
                <option value="Search">Search</option>
                <option value="Display">Display</option>
                <option value="Email">Email</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                required
                className="pl-10 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                required
                className="pl-10 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Campaign
          </button>
        </div>
      </form>
    </div>
  );
};

export default CampaignForm;
import React from 'react';
import { BarChart3, Clock, DollarSign, Users } from 'lucide-react';

const CampaignList = ({ campaigns }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Campaigns</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="relative h-48">
              <img
                src={campaign.image}
                alt={campaign.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 right-0 mt-2 mr-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {campaign.status}
                </span>
              </div>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">{campaign.name}</h3>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center text-sm text-gray-500">
                  <DollarSign className="h-4 w-4 mr-1" />
                  ${campaign.budget}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-1" />
                  {campaign.reach.toLocaleString()} reach
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {new Date(campaign.startDate).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  {campaign.platform}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="flex justify-end">
                <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignList;
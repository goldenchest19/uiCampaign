import React, { useState } from 'react';
import { PlusCircle, BarChart3, Target, Clock, DollarSign, Users, Megaphone } from 'lucide-react';
import CampaignForm from './components/CampaignForm';
import CampaignList from './components/CampaignList';
import DashboardStats from './components/DashboardStats';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: "Summer Sale 2024",
      budget: 5000,
      reach: 50000,
      status: "active",
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      platform: "Social Media",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1074"
    }
  ]);

  const addCampaign = (campaign) => {
    setCampaigns([...campaigns, { ...campaign, id: campaigns.length + 1 }]);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Megaphone className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">AdCraft Pro</span>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              New Campaign
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardStats />
        
        {showForm ? (
          <div className="mt-8">
            <CampaignForm onSubmit={addCampaign} onCancel={() => setShowForm(false)} />
          </div>
        ) : (
          <CampaignList campaigns={campaigns} />
        )}
      </main>
    </div>
  );
}

export default App;
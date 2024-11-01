import React from 'react';
import { BarChart3, Target, Clock, DollarSign, Users } from 'lucide-react';

const DashboardStats = () => {
  const stats = [
    {
      name: 'Total Budget',
      value: '$25,000',
      icon: DollarSign,
      change: '+12%',
      changeType: 'increase'
    },
    {
      name: 'Active Campaigns',
      value: '12',
      icon: Target,
      change: '+3',
      changeType: 'increase'
    },
    {
      name: 'Total Reach',
      value: '1.2M',
      icon: Users,
      change: '+18%',
      changeType: 'increase'
    },
    {
      name: 'Avg. Duration',
      value: '45 days',
      icon: Clock,
      change: '-5 days',
      changeType: 'decrease'
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => (
        <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <item.icon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{item.value}</div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {item.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
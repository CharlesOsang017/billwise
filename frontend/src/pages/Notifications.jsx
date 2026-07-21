import React, { useState } from 'react';
import { Bell, CreditCard, Sparkles, AlertTriangle, CheckCircle2 } from 'lucide-react';

const Notifications = () => {
  const [filter, setFilter] = useState('All');

  const notifications = [
    {
      id: 1,
      title: 'Upcoming Bill',
      message: 'Your Netflix subscription ($15.99) is due in 2 days.',
      type: 'warning',
      time: '2 hours ago',
      read: false,
      icon: CreditCard
    },
    {
      id: 2,
      title: 'AI Insight Available',
      message: 'We found a way you can save $45/month on your internet bill. View your AI advice dashboard.',
      type: 'insight',
      time: '5 hours ago',
      read: false,
      icon: Sparkles
    },
    {
      id: 3,
      title: 'Payment Successful',
      message: 'Your payment of $120.00 to City Water was processed successfully.',
      type: 'success',
      time: '1 day ago',
      read: true,
      icon: CheckCircle2
    },
    {
      id: 4,
      title: 'Overdue Alert',
      message: 'Your gym membership ($50.00) was due yesterday. Please settle to avoid late fees.',
      type: 'danger',
      time: '1 day ago',
      read: true,
      icon: AlertTriangle
    }
  ];

  const getIconColor = (type) => {
    switch (type) {
      case 'warning': return 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400';
      case 'insight': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
      case 'success': return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
      case 'danger': return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const filteredNotifs = filter === 'All' 
    ? notifications 
    : filter === 'Unread' 
      ? notifications.filter(n => !n.read) 
      : notifications.filter(n => n.type === filter.toLowerCase());

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <Bell className="w-8 h-8 mr-3 text-primary dark:text-blue-400" />
            Notifications
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Stay on top of your financial updates and AI insights.</p>
        </div>
        <button className="text-sm font-medium text-primary dark:text-blue-400 hover:underline">
          Mark all as read
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-4 py-3 flex space-x-2 overflow-x-auto">
          {['All', 'Unread', 'Warning', 'Insight'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                filter === tab 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {filteredNotifs.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              No notifications to display.
            </div>
          ) : (
            filteredNotifs.map((notif) => {
              const Icon = notif.icon;
              return (
                <div key={notif.id} className={`p-5 flex hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${!notif.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-4 ${getIconColor(notif.type)}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className={`text-base font-semibold ${!notif.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                        {notif.title}
                      </h4>
                      <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap ml-4">
                        {notif.time}
                      </span>
                    </div>
                    <p className={`text-sm ${!notif.read ? 'text-gray-800 dark:text-gray-200 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                      {notif.message}
                    </p>
                  </div>
                  {!notif.read && (
                    <div className="ml-4 flex-shrink-0 self-center">
                      <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;

import React, { useState, useEffect } from 'react';
import { Plus, Bell, MoreVertical, Search, Filter, Zap, Wifi, Home, FileText } from 'lucide-react';
import { getBills, createBill, updateBill } from '../api';

const Dashboard = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [bills, setBills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form State
  const [newBill, setNewBill] = useState({
    name: '',
    amount: '',
    category: 'Utilities',
    dueDate: ''
  });

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      setIsLoading(true);
      const data = await getBills();
      setBills(data);
    } catch (error) {
      console.error('Failed to fetch bills:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateBill = async () => {
    try {
      if (!newBill.name || !newBill.amount || !newBill.dueDate) {
        alert('Please fill in all fields');
        return;
      }
      
      const billData = {
        ...newBill,
        amount: parseFloat(newBill.amount)
      };

      await createBill(billData);
      setIsAddModalOpen(false);
      setNewBill({ name: '', amount: '', category: 'Utilities', dueDate: '' });
      fetchBills(); // Refresh list
    } catch (error) {
      console.error('Failed to create bill:', error);
      alert(`Error creating bill: ${error.response?.data?.message || error.message}`);
    }
  };

  const handlePayBill = async (id) => {
    try {
      await updateBill(id, { status: 'Paid', paidDate: new Date().toISOString() });
      fetchBills();
    } catch (error) {
      console.error('Failed to pay bill:', error);
    }
  };

  const getIconForCategory = (category) => {
    switch (category) {
      case 'Utilities': return { icon: Zap, bg: 'bg-orange-100', color: 'text-orange-600' };
      case 'Subscriptions': return { icon: Wifi, bg: 'bg-primary-light', color: 'text-primary' };
      case 'Rent': return { icon: Home, bg: 'bg-success-bg', color: 'text-success' };
      default: return { icon: FileText, bg: 'bg-gray-100', color: 'text-gray-600' };
    }
  };

  // Calculate totals
  const currentMonthBills = bills.filter(b => b.status !== 'Paid');
  const totalDue = currentMonthBills.reduce((acc, bill) => acc + bill.amount, 0);
  const paidThisMonth = bills.filter(b => b.status === 'Paid').reduce((acc, bill) => acc + bill.amount, 0);
  const upcomingCount = currentMonthBills.length;

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Financial Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage your recurring expenses and upcoming obligations.</p>
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary text-white px-5 py-2.5 rounded-lg font-medium flex items-center hover:bg-primary-dark transition-colors shadow-md"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Bill
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Due */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-primary-light p-3 rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
                  <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
                  <path d="M7 14H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-sm text-gray-500 font-medium">This Month</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">${totalDue.toFixed(2)}</h2>
            <p className="text-gray-500 mt-1">Total Due</p>
          </div>

          {/* Upcoming */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-orange-100 p-3 rounded-lg text-orange-600">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </div>
              <span className="text-sm text-gray-500 font-medium">Remaining</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">{upcomingCount}</h2>
            <p className="text-gray-500 mt-1">Upcoming Bills</p>
          </div>

          {/* Paid */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-success-bg p-3 rounded-lg text-success">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
              <span className="text-sm text-gray-500 font-medium">Completed</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">${paidThisMonth.toFixed(2)}</h2>
            <p className="text-gray-500 mt-1">Paid This Month</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-900">Manage Bills</h2>
          </div>
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="p-8 text-center text-gray-500">Loading bills...</div>
            ) : bills.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No bills found. Add one to get started!</div>
            ) : (
              <table className="w-full">
                <thead className="bg-white border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">
                  <tr>
                    <th className="px-6 py-4">Bill Name</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Due Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {bills.map((bill) => {
                    const { icon: Icon, bg, color } = getIconForCategory(bill.category);
                    return (
                      <tr key={bill._id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${bg} ${color}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900">{bill.name}</div>
                              <div className="text-xs text-gray-500">{bill.category}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-gray-900">
                          ${bill.amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {new Date(bill.dueDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium 
                            ${bill.status === 'Overdue' ? 'bg-danger-bg text-danger' : ''}
                            ${bill.status === 'Upcoming' ? 'bg-orange-100 text-orange-700' : ''}
                            ${bill.status === 'Paid' ? 'bg-success-bg text-success' : ''}
                          `}>
                            {bill.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {bill.status !== 'Paid' && (
                            <button 
                              onClick={() => handlePayBill(bill._id)}
                              className="text-primary hover:text-primary-dark mr-4"
                            >
                              Mark Paid
                            </button>
                          )}
                          <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-5 h-5 inline" /></button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      
      {/* Add Modal moved OUTSIDE the animate-fade-in div to fix z-index stacking context issue */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity" onClick={() => setIsAddModalOpen(false)}></div>
          <div className="bg-white rounded-xl shadow-xl transform transition-all sm:max-w-lg w-full relative z-10 overflow-hidden">
            <div className="bg-white px-6 pt-6 pb-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Add New Bill</h3>
              <p className="text-sm text-gray-500 mb-6">Enter the details of your upcoming obligation.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bill Name</label>
                  <input 
                    type="text" 
                    value={newBill.name}
                    onChange={(e) => setNewBill({...newBill, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" 
                    placeholder="e.g. Netflix Subscription" 
                  />
                </div>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
                    <input 
                      type="number" 
                      value={newBill.amount}
                      onChange={(e) => setNewBill({...newBill, amount: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" 
                      placeholder="0.00" 
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select 
                      value={newBill.category}
                      onChange={(e) => setNewBill({...newBill, category: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    >
                      <option>Utilities</option>
                      <option>Subscriptions</option>
                      <option>Rent</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input 
                    type="date" 
                    value={newBill.dueDate}
                    onChange={(e) => setNewBill({...newBill, dueDate: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary" 
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 flex flex-row-reverse space-x-3 space-x-reverse">
              <button 
                onClick={handleCreateBill}
                className="bg-primary text-white px-5 py-2.5 rounded-lg font-medium hover:bg-primary-dark transition-colors shadow-sm"
              >
                Save Bill
              </button>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="bg-white text-gray-700 border border-gray-300 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useApp } from '../AppContext';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  Bell,
  Plus,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export default function Dashboard() {
  const { user, transactions, groups } = useApp();

  const totalBalance = transactions.reduce((acc, t) => {
    if (t.type === 'Savings' || t.type === 'Income') return acc + t.amount;
    if (t.type === 'Contribution' || t.type === 'Withdrawal') return acc - t.amount;
    return acc;
  }, 0);

  const activeGroups = groups.filter(g => g.status === 'Active');

  // Sample data for the chart - based on recent transactions
  const chartData = [
    { name: 'Mon', value: 4000 },
    { name: 'Tue', value: 3000 },
    { name: 'Wed', value: 5000 },
    { name: 'Thu', value: 4500 },
    { name: 'Fri', value: 6000 },
    { name: 'Sat', value: 5500 },
    { name: 'Sun', value: totalBalance },
  ];

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy">Assalam-o-Alaikum, {user?.name}!</h1>
          <p className="text-slate-500">Here's what's happening with your savings today.</p>
        </div>
        <div className="flex gap-2">
          <Link 
            to="/transactions" 
            className="flex items-center gap-2 rounded-xl bg-brand-green px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition-all"
          >
            <Plus size={18} />
            <span>Add Entry</span>
          </Link>
          <button className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-brand-navy transition-colors">
            <Bell size={20} />
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Balance', value: `Rs. ${totalBalance.toLocaleString()}`, icon: Wallet, color: 'bg-brand-navy', text: 'text-white' },
          { label: 'Active Committees', value: activeGroups.length, icon: Users, color: 'bg-white', text: 'text-brand-navy' },
          { label: 'Monthly Growth', value: '+12.5%', icon: TrendingUp, color: 'bg-brand-mint', text: 'text-brand-green' },
          { label: 'Next Payout', value: '15th May', icon: Bell, color: 'bg-white', text: 'text-slate-500' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`${stat.color} p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between min-h-[140px]`}
          >
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-lg ${stat.color === 'bg-white' ? 'bg-slate-50 text-slate-400' : 'bg-white/10 text-white'}`}>
                <stat.icon size={20} />
              </div>
            </div>
            <div>
              <p className={`text-sm font-medium ${stat.text === 'text-white' ? 'text-white/70' : 'text-slate-400'}`}>{stat.label}</p>
              <h3 className={`text-2xl font-bold mt-1 ${stat.text}`}>{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h3 className="text-xl">Savings Overview</h3>
                  <p className="text-sm text-slate-400">Weekly accumulation</p>
               </div>
               <select className="bg-slate-50 border-none text-sm rounded-lg py-1 px-3 text-slate-500 font-medium">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
               </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#059669" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Active Committees Progress */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl">Committee Progress</h3>
              <Link to="/groups" className="text-sm font-semibold text-brand-green flex items-center gap-1">
                View All <ChevronRight size={16} />
              </Link>
            </div>
            <div className="space-y-6">
              {activeGroups.map(group => (
                <div key={group.id} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-brand-navy">{group.name}</span>
                    <span className="text-slate-400">{group.progress}% Complete</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${group.progress}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-brand-green rounded-full shadow-[0_0_8px_rgba(5,150,105,0.4)]"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Monthly: Rs. {group.contributionAmount.toLocaleString()}</span>
                    <span>Payout Order: #{group.members.indexOf(user?.name || '') + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar inside dashboard */}
        <div className="space-y-8">
          {/* Recent Transactions */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl">Activity</h3>
              <Link to="/transactions" className="text-sm font-semibold text-brand-green">History</Link>
            </div>
            <div className="space-y-4">
              {transactions.slice(0, 5).map(t => (
                <div key={t.id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${
                      t.type === 'Income' || t.type === 'Savings' 
                        ? 'bg-emerald-50 text-emerald-600' 
                        : 'bg-orange-50 text-orange-600'
                    }`}>
                      {t.type === 'Income' || t.type === 'Savings' ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-brand-navy">{t.description}</p>
                      <p className="text-xs text-slate-400">{new Date(t.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <p className={`text-sm font-bold ${
                    t.type === 'Income' || t.type === 'Savings' ? 'text-emerald-600' : 'text-orange-600'
                  }`}>
                    {t.type === 'Income' || t.type === 'Savings' ? '+' : '-'} Rs. {t.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-brand-navy p-6 rounded-3xl text-white overflow-hidden relative group">
             <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 bg-brand-green/20 rounded-full blur-2xl group-hover:bg-brand-green/30 transition-all duration-700"></div>
             <h4 className="text-brand-green text-sm font-bold tracking-widest uppercase mb-4">Financial Tip</h4>
             <p className="text-lg leading-relaxed mb-6 font-medium">
               "Saving just 10% of your salary in a committee can help you buy your dream bike in 12 months!"
             </p>
             <Link 
              to="/education" 
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-green hover:gap-3 transition-all"
            >
               Learn more <ArrowRight size={16} />
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

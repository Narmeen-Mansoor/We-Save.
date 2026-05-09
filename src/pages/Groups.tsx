/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Plus, 
  Search, 
  Calendar, 
  Wallet, 
  X, 
  Info,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export default function Groups() {
  const { groups, addGroup, joinGroup, user } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // New Group Form State
  const [newGroup, setNewGroup] = useState({
    name: '',
    contributionAmount: 5000,
    totalMembers: 10,
    payoutCycle: 'Monthly'
  });

  const filteredGroups = groups.filter(g => 
    g.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    addGroup({
      ...newGroup,
      members: [user?.name || 'User']
    });
    setIsModalOpen(false);
    setNewGroup({ name: '', contributionAmount: 5000, totalMembers: 10, payoutCycle: 'Monthly' });
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 text-white">
        <div className="bg-brand-navy p-8 rounded-3xl w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative overflow-hidden">
           <div className="absolute right-0 top-0 -mr-12 -mt-12 h-48 w-48 bg-brand-green/20 rounded-full blur-3xl"></div>
           <div className="z-10">
              <h1 className="text-3xl font-bold flex items-center gap-3">
                 <Users className="text-brand-green" /> 
                 Savings Committees
              </h1>
              <p className="text-slate-400 mt-2">Join a circle or create your own with trusted members.</p>
           </div>
           <button 
             onClick={() => setIsModalOpen(true)}
             className="z-10 flex items-center gap-2 rounded-2xl bg-brand-green px-6 py-4 font-bold text-white shadow-lg shadow-brand-green/20 hover:bg-emerald-700 transition-all hover:scale-105 active:scale-95"
           >
             <Plus size={20} />
             <span>Create Committee</span>
           </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search committees..." 
            className="w-full bg-white rounded-2xl border border-slate-100 py-4 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-brand-green outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="hidden sm:block bg-white border border-slate-100 rounded-2xl px-6 py-4 font-semibold text-brand-navy outline-none shadow-sm">
           <option>All Cycles</option>
           <option>Monthly</option>
           <option>Bi-weekly</option>
        </select>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredGroups.map((group) => {
            const isMember = group.members.includes(user?.name || '');
            const isFull = group.members.length >= group.totalMembers;

            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={group.id}
                className="bg-white rounded-3xl border border-slate-100 p-6 flex flex-col shadow-sm hover:shadow-xl hover:shadow-slate-200 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-brand-mint text-brand-green flex items-center justify-center font-bold text-lg">
                      {group.name[0]}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-brand-navy">{group.name}</h3>
                      <p className="text-xs text-slate-400">Created by {group.createdBy}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    group.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'
                  }`}>
                    {group.status}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-2 mb-6">
                  <div className="bg-slate-50 p-3 rounded-2xl">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Monthly</p>
                    <p className="font-bold text-brand-navy">Rs. {group.contributionAmount.toLocaleString()}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Members</p>
                    <p className="font-bold text-brand-navy">{group.members.length}/{group.totalMembers}</p>
                  </div>
                </div>

                <div className="flex -space-x-3 mb-6 items-center px-1">
                   {group.members.slice(0, 5).map((member, i) => (
                      <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold shadow-sm">
                         {member[0]}
                      </div>
                   ))}
                   {group.members.length > 5 && (
                      <div className="h-10 w-10 rounded-full border-2 border-white bg-brand-navy text-white flex items-center justify-center text-[10px] font-bold">
                         +{group.members.length - 5}
                      </div>
                   )}
                   <span className="ml-4 text-xs font-semibold text-slate-400 italic">
                      {group.payoutCycle} rotation
                   </span>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                   <div className="flex items-center gap-2 text-brand-green font-bold text-sm">
                      <Wallet size={16} /> Rs. {(group.contributionAmount * group.totalMembers).toLocaleString()} pool
                   </div>
                   {isMember ? (
                      <div className="flex items-center gap-1 text-brand-green font-bold text-sm bg-brand-mint px-3 py-2 rounded-xl">
                        <CheckCircle2 size={16} /> Joined
                      </div>
                   ) : (
                      <button 
                        onClick={() => joinGroup(group.id)}
                        disabled={isFull}
                        className={`flex items-center gap-2 rounded-xl px-5 py-2.5 font-bold text-sm transition-all ${
                          isFull 
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                            : 'bg-brand-navy text-white hover:bg-slate-800'
                        }`}
                      >
                        Join Now
                      </button>
                   )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Create Group Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 border border-white/20"
            >
              <div className="flex justify-between items-center mb-8">
                 <h2 className="text-2xl font-bold text-brand-navy">Start New Committee</h2>
                 <button onClick={() => setIsModalOpen(false)} className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-brand-navy">
                    <X size={20} />
                 </button>
              </div>

              <form onSubmit={handleCreateGroup} className="space-y-6">
                <div>
                   <label className="block text-sm font-bold text-brand-navy mb-2">Committee Name</label>
                   <input 
                     required
                     className="w-full bg-slate-50 border-none rounded-xl py-4 px-4 focus:ring-2 focus:ring-brand-green transition-all font-medium text-brand-navy"
                     placeholder="e.g., Office Lunch Savers"
                     value={newGroup.name}
                     onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                   />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-brand-navy mb-2">Monthly Amount</label>
                    <div className="relative">
                       <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">Rs.</span>
                       <input 
                         required
                         type="number"
                         className="w-full bg-slate-50 border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-brand-green transition-all font-bold text-brand-navy"
                         value={newGroup.contributionAmount}
                         onChange={(e) => setNewGroup({...newGroup, contributionAmount: Number(e.target.value)})}
                       />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-navy mb-2">Max Members</label>
                    <input 
                      required
                      type="number"
                      className="w-full bg-slate-50 border-none rounded-xl py-4 px-4 focus:ring-2 focus:ring-brand-green transition-all font-bold text-brand-navy"
                      value={newGroup.totalMembers}
                      onChange={(e) => setNewGroup({...newGroup, totalMembers: Number(e.target.value)})}
                    />
                  </div>
                </div>

                <div>
                   <label className="block text-sm font-bold text-brand-navy mb-2">Payout Cycle</label>
                   <div className="flex gap-2">
                     {['Monthly', 'Bi-weekly', 'Weekly'].map(cycle => (
                       <button
                         key={cycle}
                         type="button"
                         onClick={() => setNewGroup({...newGroup, payoutCycle: cycle})}
                         className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                            newGroup.payoutCycle === cycle 
                              ? 'bg-brand-navy text-white shadow-lg' 
                              : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                         }`}
                       >
                         {cycle}
                       </button>
                     ))}
                   </div>
                </div>

                <div className="bg-brand-mint/50 p-4 rounded-2xl flex gap-3 items-start border border-brand-green/20">
                   <Info className="flex-shrink-0 text-brand-green" size={20} />
                   <p className="text-xs text-brand-green font-medium leading-relaxed">
                     Total pool will be <strong>Rs. {(newGroup.contributionAmount * newGroup.totalMembers).toLocaleString()}</strong>. Each member takes home this amount once every cycle.
                   </p>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full bg-brand-green text-white font-bold py-5 rounded-2xl shadow-xl shadow-brand-green/20 hover:bg-emerald-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Confirm & Start Group
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

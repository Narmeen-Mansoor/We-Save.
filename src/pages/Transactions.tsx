/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  ArrowUpRight, 
  ArrowDownRight, 
  Search, 
  Filter,
  Download,
  Calendar,
  Wallet,
  Tag,
  X
} from 'lucide-react';
import { TransactionType } from '../types';

export default function Transactions() {
  const { transactions, addTransaction, deleteTransaction } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<TransactionType | 'All'>('All');

  const [newTransaction, setNewTransaction] = useState({
    amount: 0,
    type: 'Savings' as TransactionType,
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || t.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTransaction.amount <= 0 || !newTransaction.description) return;
    
    addTransaction({
      ...newTransaction,
      date: new Date(newTransaction.date).toISOString()
    });
    
    setIsModalOpen(false);
    setNewTransaction({
      amount: 0,
      type: 'Savings',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy">Transaction Ledger</h1>
          <p className="text-slate-500 mt-1">Track every rupee, save for the bigger picture.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all">
            <Download size={18} />
            <span>Export CSV</span>
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-slate-800 transition-all"
          >
            <Plus size={18} />
            <span>Add Entry</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center">
         <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by description..." 
              className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-brand-green/20 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
         <div className="flex gap-2 overflow-x-auto w-full md:w-auto no-scrollbar">
            {['All', 'Income', 'Savings', 'Contribution', 'Withdrawal'].map((type) => (
               <button
                 key={type}
                 onClick={() => setTypeFilter(type as any)}
                 className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                   typeFilter === type 
                     ? 'bg-brand-navy text-white shadow-lg' 
                     : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                 }`}
               >
                 {type}
               </button>
            ))}
         </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] uppercase tracking-widest font-bold text-slate-400">
                <th className="px-6 py-4">Transaction</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence>
                {filteredTransactions.map((t) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={t.id} 
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-5">
                       <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl ${
                            t.type === 'Income' || t.type === 'Savings' 
                              ? 'bg-emerald-50 text-emerald-600' 
                              : 'bg-orange-50 text-orange-600'
                          }`}>
                            {t.type === 'Income' || t.type === 'Savings' ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                          </div>
                          <span className="font-bold text-brand-navy">{t.description}</span>
                       </div>
                    </td>
                    <td className="px-6 py-5">
                       <span className="text-xs font-semibold px-2 py-1 bg-slate-100 rounded-md text-slate-500">{t.type}</span>
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-400">
                      {new Date(t.date).toLocaleDateString()}
                    </td>
                    <td className={`px-6 py-5 font-bold ${
                      t.type === 'Income' || t.type === 'Savings' ? 'text-emerald-600' : 'text-orange-600'
                    }`}>
                      {t.type === 'Income' || t.type === 'Savings' ? '+' : '-'} Rs. {t.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-5 text-right">
                       <button 
                        onClick={() => deleteTransaction(t.id)}
                        className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                       >
                         <Trash2 size={18} />
                       </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {filteredTransactions.length === 0 && (
                <tr>
                   <td colSpan={5} className="px-6 py-20 text-center text-slate-400 font-medium italic">
                      No matching transactions found.
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Transaction Modal */}
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
                 <h2 className="text-2xl font-bold text-brand-navy">New Entry</h2>
                 <button onClick={() => setIsModalOpen(false)} className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-brand-navy">
                    <X size={20} />
                 </button>
              </div>

              <form onSubmit={handleAddTransaction} className="space-y-6">
                <div>
                   <label className="block text-sm font-bold text-brand-navy mb-2">Description</label>
                   <div className="relative">
                      <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        required
                        className="w-full bg-slate-50 border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-brand-green transition-all font-medium text-brand-navy"
                        placeholder="e.g., Monthly Committee Payout"
                        value={newTransaction.description}
                        onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                      />
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-brand-navy mb-2">Amount</label>
                    <div className="relative">
                       <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                       <input 
                         required
                         type="number"
                         className="w-full bg-slate-50 border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-brand-green transition-all font-bold text-brand-navy"
                         value={newTransaction.amount || ''}
                         onChange={(e) => setNewTransaction({...newTransaction, amount: Number(e.target.value)})}
                       />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-navy mb-2">Date</label>
                    <div className="relative">
                       <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                       <input 
                         required
                         type="date"
                         className="w-full bg-slate-50 border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-brand-green transition-all font-medium text-brand-navy"
                         value={newTransaction.date}
                         onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                       />
                    </div>
                  </div>
                </div>

                <div>
                   <label className="block text-sm font-bold text-brand-navy mb-2">Transaction Type</label>
                   <div className="grid grid-cols-2 gap-2">
                     {['Income', 'Savings', 'Contribution', 'Withdrawal'].map(type => (
                       <button
                         key={type}
                         type="button"
                         onClick={() => setNewTransaction({...newTransaction, type: type as TransactionType})}
                         className={`py-3 rounded-xl text-xs font-bold transition-all ${
                            newTransaction.type === type 
                              ? 'bg-brand-navy text-white shadow-lg' 
                              : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                         }`}
                       >
                         {type}
                       </button>
                     ))}
                   </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full bg-brand-green text-white font-bold py-5 rounded-2xl shadow-xl shadow-brand-green/20 hover:bg-emerald-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Add Transaction
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

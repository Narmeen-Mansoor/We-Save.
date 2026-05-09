/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Transaction, SavingsGroup } from './types';

interface AppContextType {
  user: User | null;
  login: (email: string, name: string) => void;
  logout: () => void;
  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  groups: SavingsGroup[];
  addGroup: (g: Omit<SavingsGroup, 'id' | 'createdBy' | 'status' | 'progress'>) => void;
  joinGroup: (groupId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('wesave_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('wesave_transactions');
    return saved ? JSON.parse(saved) : [
      { id: '1', amount: 5000, type: 'Savings', date: new Date().toISOString(), description: 'Initial Savings' },
      { id: '2', amount: 2000, type: 'Contribution', date: new Date().toISOString(), description: 'Committee Contribution' }
    ];
  });

  const [groups, setGroups] = useState<SavingsGroup[]>(() => {
    const saved = localStorage.getItem('wesave_groups');
    return saved ? JSON.parse(saved) : [
      { 
        id: 'g1', 
        name: 'Family Committee', 
        contributionAmount: 5000, 
        totalMembers: 12, 
        members: ['User', 'Ahmed', 'Fatima'], 
        payoutCycle: 'Monthly', 
        status: 'Active', 
        createdBy: 'Admin',
        progress: 25 
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('wesave_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('wesave_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('wesave_groups', JSON.stringify(groups));
  }, [groups]);

  const login = (email: string, name: string) => {
    setUser({ id: Math.random().toString(36).substr(2, 9), email, name });
  };

  const logout = () => setUser(null);

  const addTransaction = (t: Omit<Transaction, 'id'>) => {
    setTransactions([{ ...t, id: Math.random().toString(36).substr(2, 9) }, ...transactions]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const addGroup = (g: Omit<SavingsGroup, 'id' | 'createdBy' | 'status' | 'progress'>) => {
    setGroups([{
      ...g,
      id: Math.random().toString(36).substr(2, 9),
      createdBy: user?.name || 'Anonymous',
      status: 'Active',
      progress: 0,
      members: [user?.name || 'User']
    }, ...groups]);
  };

  const joinGroup = (groupId: string) => {
    setGroups(groups.map(g => {
      if (g.id === groupId && user && !g.members.includes(user.name)) {
        return { ...g, members: [...g.members, user.name] };
      }
      return g;
    }));
  };

  return (
    <AppContext.Provider value={{ 
      user, login, logout, 
      transactions, addTransaction, deleteTransaction,
      groups, addGroup, joinGroup 
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}

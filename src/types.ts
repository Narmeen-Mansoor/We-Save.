/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface User {
  id: string;
  name: string;
  email: string;
}

export type TransactionType = 'Savings' | 'Contribution' | 'Withdrawal' | 'Income';

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  date: string;
  description: string;
}

export interface SavingsGroup {
  id: string;
  name: string;
  contributionAmount: number;
  totalMembers: number;
  members: string[];
  payoutCycle: string;
  status: 'Active' | 'Completed';
  createdBy: string;
  progress: number;
}

import { readFileSync, writeFileSync } from 'node:fs';

export interface Expense {
  /** ISO date, e.g. 2026-11-02 */
  date: string;
  amount: number;
  category: string;
  note?: string;
}

export const DEFAULT_DATA_FILE = new URL('../data/expenses.json', import.meta.url);

export function loadExpenses(file: string | URL = DEFAULT_DATA_FILE): Expense[] {
  return JSON.parse(readFileSync(file, 'utf8')) as Expense[];
}

export function saveExpenses(expenses: Expense[], file: string | URL = DEFAULT_DATA_FILE): void {
  writeFileSync(file, JSON.stringify(expenses, null, 2) + '\n');
}

export function addExpense(expenses: Expense[], expense: Expense): Expense[] {
  if (!Number.isFinite(expense.amount) || expense.amount <= 0) {
    throw new Error(`invalid amount: ${expense.amount}`);
  }
  return [...expenses, expense];
}

export function totalsByCategory(expenses: Expense[]): Record<string, number> {
  const totals: Record<string, number> = {};
  for (const e of expenses) {
    totals[e.category] = (totals[e.category] ?? 0) + e.amount;
  }
  return totals;
}

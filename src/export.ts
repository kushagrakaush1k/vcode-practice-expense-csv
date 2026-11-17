import { writeFileSync } from 'node:fs';
import type { Expense } from './expenses.ts';

/** Writes all expenses as pretty-printed JSON and returns the path written. */
export function exportJson(expenses: Expense[], outPath = 'expenses-export.json'): string {
  writeFileSync(outPath, JSON.stringify(expenses, null, 2) + '\n');
  return outPath;
}

import { writeFileSync } from 'node:fs';
import type { Expense } from './expenses.ts';

export const CsvColumn = {
  Amount: 'amount',
  Date: 'date',
  Category: 'category',
  Note: 'note',
} as const;

export type CsvColumn = (typeof CsvColumn)[keyof typeof CsvColumn];

const CSV_COLUMNS: readonly CsvColumn[] = [
  CsvColumn.Amount,
  CsvColumn.Date,
  CsvColumn.Category,
  CsvColumn.Note,
];

function escapeCsvField(value: string): string {
  if (/[",\r\n]/.test(value)) {
    return `"${value.replaceAll('"', '""')}"`;
  }
  return value;
}

/** Writes all expenses as pretty-printed JSON and returns the path written. */
export function exportJson(expenses: Expense[], outPath = 'expenses-export.json'): string {
  writeFileSync(outPath, JSON.stringify(expenses, null, 2) + '\n');
  return outPath;
}

/** Writes all expenses as CSV and returns the path written. */
export function exportCsv(
  expenses: Expense[],
  outPath = `expenses-${new Date().toISOString().slice(0, 10)}.csv`,
): string {
  const header = CSV_COLUMNS.join(',');
  const rows = expenses.map((e) => {
    const values: Record<CsvColumn, string> = {
      [CsvColumn.Amount]: e.amount.toFixed(2),
      [CsvColumn.Date]: e.date,
      [CsvColumn.Category]: e.category,
      [CsvColumn.Note]: e.note ?? '',
    };
    return CSV_COLUMNS.map((col) => escapeCsvField(values[col])).join(',');
  });
  writeFileSync(outPath, [header, ...rows].join('\n') + '\n');
  return outPath;
}

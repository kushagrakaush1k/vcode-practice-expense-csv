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

function localDateString(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** Writes all expenses as CSV and returns the path written. */
export function exportCsv(
  expenses: Expense[],
  outPath = `expenses-${localDateString()}.csv`,
): string {
  const header = CSV_COLUMNS.join(',');
  const rows = expenses.map((e) => {
    // Truncate notes to 50 characters because our spreadsheet truncates/breaks on longer notes.
    const note = (e.note ?? '').slice(0, 50);
    const values: Record<CsvColumn, string> = {
      [CsvColumn.Amount]: e.amount.toFixed(2),
      [CsvColumn.Date]: e.date,
      [CsvColumn.Category]: e.category,
      [CsvColumn.Note]: note,
    };
    return CSV_COLUMNS.map((col) => escapeCsvField(values[col])).join(',');
  });
  writeFileSync(outPath, [header, ...rows].join('\n') + '\n');
  return outPath;
}

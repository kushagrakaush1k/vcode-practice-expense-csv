import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { CsvColumn, exportCsv, exportJson } from '../src/export.ts';

test('exportJson writes every expense as JSON', () => {
  const out = join(mkdtempSync(join(tmpdir(), 'exp-')), 'out.json');
  const expenses = [{ date: '2026-11-02', amount: 12.5, category: 'food' }];
  assert.equal(exportJson(expenses, out), out);
  assert.deepEqual(JSON.parse(readFileSync(out, 'utf8')), expenses);
});

test('exportCsv writes expenses with amount,date,category,note header and escapes fields', () => {
  const out = join(mkdtempSync(join(tmpdir(), 'exp-')), 'out.csv');
  const expenses = [
    { date: '2026-11-02', amount: 12.5, category: 'food', note: 'lunch with the team' },
    { date: '2026-11-05', amount: 7.25, category: 'food', note: 'coffee, "beans"' },
    { date: '2026-11-09', amount: 120, category: 'bills' },
  ];
  assert.equal(exportCsv(expenses, out), out);
  assert.equal(
    readFileSync(out, 'utf8'),
    [
      `${CsvColumn.Amount},${CsvColumn.Date},${CsvColumn.Category},${CsvColumn.Note}`,
      '12.5,2026-11-02,food,lunch with the team',
      '7.25,2026-11-05,food,"coffee, ""beans"""',
      '120,2026-11-09,bills,',
      '',
    ].join('\n'),
  );
});

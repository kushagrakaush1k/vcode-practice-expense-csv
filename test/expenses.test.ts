import { test } from 'node:test';
import assert from 'node:assert/strict';
import { addExpense, totalsByCategory, type Expense } from '../src/expenses.ts';

const sample: Expense[] = [
  { date: '2026-11-02', amount: 12.5, category: 'food' },
  { date: '2026-11-03', amount: 40, category: 'transport' },
  { date: '2026-11-05', amount: 7.25, category: 'food' },
];

test('addExpense appends without mutating', () => {
  const next = addExpense(sample, { date: '2026-11-06', amount: 3, category: 'food' });
  assert.equal(next.length, 4);
  assert.equal(sample.length, 3);
});

test('addExpense rejects non-positive amounts', () => {
  assert.throws(() => addExpense(sample, { date: '2026-11-06', amount: 0, category: 'food' }));
});

test('totalsByCategory sums per category', () => {
  assert.deepEqual(totalsByCategory(sample), { food: 19.75, transport: 40 });
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { exportJson } from '../src/export.ts';

test('exportJson writes every expense as JSON', () => {
  const out = join(mkdtempSync(join(tmpdir(), 'exp-')), 'out.json');
  const expenses = [{ date: '2026-11-02', amount: 12.5, category: 'food' }];
  assert.equal(exportJson(expenses, out), out);
  assert.deepEqual(JSON.parse(readFileSync(out, 'utf8')), expenses);
});

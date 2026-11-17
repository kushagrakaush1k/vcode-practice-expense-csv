import { addExpense, loadExpenses, saveExpenses, totalsByCategory } from './expenses.ts';
import { exportCsv, exportJson } from './export.ts';

const [command, ...args] = process.argv.slice(2);

switch (command) {
  case 'list': {
    for (const e of loadExpenses()) {
      console.log(`${e.date}  ${e.amount.toFixed(2).padStart(8)}  ${e.category.padEnd(10)} ${e.note ?? ''}`);
    }
    break;
  }
  case 'add': {
    const [amount, category, note] = args;
    const today = new Date().toISOString().slice(0, 10);
    saveExpenses(addExpense(loadExpenses(), { date: today, amount: Number(amount), category, note }));
    console.log('added');
    break;
  }
  case 'total': {
    for (const [category, total] of Object.entries(totalsByCategory(loadExpenses()))) {
      console.log(`${category.padEnd(10)} ${total.toFixed(2)}`);
    }
    break;
  }
  case 'export': {
    console.log(`wrote ${exportJson(loadExpenses())}`);
    break;
  }
  case 'export-csv': {
    console.log(`wrote ${exportCsv(loadExpenses())}`);
    break;
  }
  default:
    console.log('usage: npm start -- <list | add <amount> <category> [note] | total | export | export-csv>');
}

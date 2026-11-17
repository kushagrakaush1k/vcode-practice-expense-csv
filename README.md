# expense-tracker

A tiny command-line expense tracker. Expenses live in `data/expenses.json`.

```
npm start -- list
npm start -- add 12.50 food "lunch with the team"
npm start -- total
npm start -- export          # writes expenses-export.json to the current folder
npm start -- export-csv      # writes expenses-export.csv to the current folder
npm test
```

Requires Node 23.6 or newer (runs TypeScript directly).

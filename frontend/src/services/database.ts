// src/services/Database.ts

import { openDatabase, SQLiteDatabase, ResultSet } from 'react-native-sqlite-storage';
import '@react'
// Step 1: Define the "shape" of your data with an interface.
// This is your contract for what a Schedule object looks like in your app.
export interface Schedule {
  id: number;
  title: string;
  notification_time: string; // Storing time as a string like '17:00' is common
  is_active: boolean; // In the app, we want a boolean
}

export interface ScheduleRule {
  id: number;
  schedule_id: number;
  rule_type: 'exclude_day' | 'include_month'; // Use string literals for specific types
  value: number;
}


// Give the db object its type for better autocompletion
const db: SQLiteDatabase = openDatabase(
  {
    name: 'schedule.db',
    location: 'default',
  },
  () => {
    console.log('Database connection opened successfully.');
  },
  (error) => {
    console.error('Error opening database: ', error);
  }
);

// This function's return type is 'void' because it doesn't return anything.
export const createTable = (): void => {
  db.transaction(txn => {
    // Note: SQLite doesn't have a true BOOLEAN type. We use INTEGER 0 for false and 1 for true.
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS schedules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(255) NOT NULL,
        notification_time TEXT NOT NULL,
        is_active INTEGER DEFAULT 1
      );`,
      [],
      () => {
        console.log('Schedules table created successfully.');
      },
      error => {
        console.error('Error creating schedules table: ', error);
      }
    );

    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS schedule_rules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        schedule_id INTEGER,
        rule_type TEXT NOT NULL,
        value INTEGER NOT NULL,
        FOREIGN KEY (schedule_id) REFERENCES schedules(id) ON DELETE CASCADE
      );`,
      [],
      () => {
        console.log('Schedule_rules table created successfully.');
      },
      error => {
        console.error('Error creating schedule_rules table: ', error);
      }
    );
  });
};

// --- Example of a typed data-fetching function ---

// This function now guarantees it will return a Promise that resolves
// with an array of Schedule objects.
export const getSchedules = (): Promise<Schedule[]> => {
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM schedules;',
        [],
        (_, results: ResultSet) => {
          const schedules: Schedule[] = [];
          for (let i = 0; i < results.rows.length; i++) {
            const row = results.rows.item(i);
            schedules.push({
              id: row.id,
              title: row.title,
              notification_time: row.notification_time,
              // Convert the INTEGER from the DB (0 or 1) to a JS boolean
              is_active: row.is_active === 1,
            });
          }
          resolve(schedules);
        },
        error => {
          reject(error);
        }
      );
    });
  });
};

// src/services/Database.ts

import { openDatabase, SQLiteDatabase, ResultSet } from 'react-native-sqlite-storage';


// Step 1: Define the "shape" of your data with an interface.
// This is your contract for what a Schedule object looks like in your app.
export interface Schedule {
  id: number;
  title: string;
  desc: string; // Storing time as a string like '17:00' is common
  is_active: boolean; // In the app, we want a boolean
  
}

export interface TaskPreset {
  id: number;
  schedule_id: number;
  card: string; // Use string literals for specific types
  card_group:string;
  data: string[];
}


const enableForeignKeys = (db: SQLiteDatabase): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(
                'PRAGMA foreign_keys = ON;',
                [],
                // Ensure it resolves upon success
                () => { resolve(); }, 
                (tx, error) => { 
                    console.error("Failed to enable Foreign Keys:", error);
                    reject(error);
                    return true;
                }
            );
        });
    });
};

export const db: SQLiteDatabase = openDatabase(
  {
    name: 'schedule.db',
    location: 'default',
  },
  async () => {
    console.log('Database connection opened successfully.');
    try {
        await enableForeignKeys(db); 
        console.log('Foreign Key Constraints are now ENABLED.');
        
        await createTable(); 

    } catch (e) {
        console.error('CRITICAL: Foreign Keys failed to enable on startup.');
    }
  },
  (error) => {
    console.error('Error opening database: ', error);
  }
);

// This function's return type is 'void' because it doesn't return anything.
export const createTable = (): Promise<void> => {
  return new Promise((resolve, reject)=>{
  db.transaction(txn => {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS schedules (
        task_id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        is_active INTEGER DEFAULT 1
      );`,
      [],
      () => {
        console.log('Schedules table created successfully.');
      },
      (error) => {
        console.error('Error creating schedules table: ', error);
        reject(error);
      }
    );

    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS task_card (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        schedule_id INTEGER,
        card TEXT NOT NULL,
        card_group TEXT NOT NULL,
        data Text,
        FOREIGN KEY (schedule_id) REFERENCES schedules(task_id) ON DELETE CASCADE
      );`,
      [],
      () => {
        console.log('Schedule_rules table created successfully.');
        resolve();
      },
      error => {
        console.error('Error creating schedule_rules table: ', error);
        reject(error);
      }
    );
  });
})
};
//function to insert

export const addSchedule = (title: string, desc: string, is_active = true): Promise<number> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      txn => {
        txn.executeSql(
          `INSERT INTO schedules (title, description, is_active) VALUES (?, ?, ?);`,
          [title, desc, is_active ? 1 : 0],
          (_, result) => resolve(result.insertId as number),
          (_, error) => { reject(error); return true; } 
        );
      }, 
      (error) => {
        console.error("Transaction failed during addSchedule:", error);
        reject(error);
      },
      () => {}
    );
  });
};

//Updation :)

export const TurnOffTask = (id: number, is_active: boolean): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        `UPDATE schedules SET is_active = ? WHERE task_id = ?;`,
        [is_active ? 1 : 0, id],
        () => resolve(),
        (_, error) => { reject(error); return false; }
      );
    });
  });
};

// Deletion

export const deleteSchedule = (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      console.log(id,"Removed");
      txn.executeSql(
        `DELETE FROM schedules WHERE task_id = ?;`,
        [id],
        () => resolve(),
        (_, error) => { reject(error); return false; }
      );
    });
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
              id: row.task_id,
              title: row.title,
              desc: row.description,
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


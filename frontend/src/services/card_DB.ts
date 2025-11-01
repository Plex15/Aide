// src/services/Database.ts

import { openDatabase, SQLiteDatabase, ResultSet } from 'react-native-sqlite-storage';
import { db } from './database';

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


// Give the db object its type for better autocompletion
// const db: SQLiteDatabase = openDatabase(
//   {
//     name: 'schedule.db',
//     location: 'default',
//   },
//   () => {
    
//     console.log('Database connection opened successfully.');
//   },
//   (error) => {
//     console.error('Error opening database: ', error);
//   }
// );


export const AddCard = (id:number,card: string, card_group:string,data:string[]): Promise<number> => {
  const JsonString = JSON.stringify(data); 
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        `INSERT INTO task_card (schedule_id,card, card_group, data) VALUES (?,?, ?, ?);`,
        [id,card, card_group, JsonString],
        (_, result) => resolve(result.insertId as number),
        (_, error) => { reject(error); return false; }
      );
    });
  }
);
};


export const UpdateCard = (id: number, data:string[]): Promise<void> => {
    const JsonString = JSON.stringify(data); 
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        `UPDATE task_card SET data = ? WHERE id = ?;`,
        [JsonString, id],
        () => resolve(),
        (_, error) => { reject(error); return false; }
      );
    });
  });

};

// Deletion

export const deletecard = (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        `DELETE FROM task_card WHERE id = ?;`,
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
export const GetCardData = (): Promise<TaskPreset[]> => {
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM task_card;',
        [],
        (_, results: ResultSet) => {
          const schedules: TaskPreset[] = [];
          for (let i = 0; i < results.rows.length; i++) {
            const row = results.rows.item(i);
            schedules.push({
              id:row.id,
              schedule_id:row.schedule_id,
              card:row.card,
              card_group:row.card_group, 
              data:JSON.parse(row.data)
              
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
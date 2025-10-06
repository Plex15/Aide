import { createTable } from "./database";

// It's good practice for init functions to return a Promise
// so you know when they are finished.
export const database_init = (): Promise<void> => {
  console.log('Initializing Database...');
  return new Promise((resolve, reject) => {
    try {
      // This is the function that actually creates the tables
      createTable();
      console.log('Database Initialized Successfully.');
      resolve(); // Signal that this task is complete
    } catch (error) {
      console.error('Database Initialization Failed:', error);
      reject(error); // Signal that this task failed
    }
  });
};
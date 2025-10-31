import { GetCardData } from "./card_DB";
import { createTable, getSchedules } from "./database";

// It's good practice for init functions to return a Promise
// so you know when they are finished.
export const database_init = (): Promise<void> => {
  console.log('Initializing Database...');
  return new Promise((resolve, reject) => {
    try {
      // This is the function that actually creates the tables
      createTable();
      console.log('Database Initialized Successfully.');
      getdata()
      resolve(); // Signal that this task is complete
    } catch (error) {
      console.error('Database Initialization Failed:', error);
      reject(error); // Signal that this task failed
    }

  });
};

const getdata= async() => {
  const data1 = await getSchedules()
  console.log("task_table initialized")
  const data2 = await GetCardData()
  console.log("card table initialized")
}

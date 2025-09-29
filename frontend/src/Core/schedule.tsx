
export let PI = 2 ;

export const formatDate = (date: Date): string => {
  // ... formatting logic
  return date.toLocaleDateString();
};

export interface User {
  id: string;
  name: string;
}
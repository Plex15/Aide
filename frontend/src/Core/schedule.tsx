
export const PI = 3.14159;

export const formatDate = (date: Date): string => {
  // ... formatting logic
  return date.toLocaleDateString();
};

export interface User {
  id: string;
  name: string;
}
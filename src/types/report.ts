export interface Report {
    id: string;
    title: string;
    description: string;
    updatedAt: string;
    category?: string[]; // Add this line if it's not already there
  }
  
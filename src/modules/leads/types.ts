// Types (define properly based on your backend)
export interface LeadData {
  name: string;
  email: string;
  phone?: string;
  status?: "cold" | "warm" | "hot" | "converted" | "lost";
  // Add any additional fields here
}

export interface LeadStatusUpdate {
  id: string;
  status: "cold" | "warm" | "hot" | "converted" | "lost";
}

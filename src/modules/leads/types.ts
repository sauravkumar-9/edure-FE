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
  note?: string;
}

export interface LoadType {
  loadType: "page" | "table";
  queryString?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: "verified" | "unverified";
  tag?: "hot" | "warm" | "cold";
  date: string;
  applications?: number;
  converted?: number;
}

export interface LogItem {
  id: string; // Unique identifier for each log item
  logId: string;
  timestamp: number; // When the log item was created or recorded
  note: string; // Text note for the log item
}

export interface Log {
  id: string;
  name: string;
  lastUpdated: number;
}

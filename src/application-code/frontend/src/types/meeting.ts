export interface ActionItem {
  task: string;
  assignee: string;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface TranscriptUtterance {
  timestamp: string;
  speaker: string;
  text: string;
}

export interface MeetingData {
  id: string;
  filename: string;
  createdAt: string;
  status: 'processing' | 'completed' | 'failed';
  duration?: string;
  summary?: string;
  actionItems?: ActionItem[];
  decisions?: string[];
  risks?: string[];
  transcript?: TranscriptUtterance[];
}
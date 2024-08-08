export interface ChatMessage {
  id: number;
  message: string;
  msg_from: 'user' | 'gpt';
}

export interface Event {
  id: string;
  type: string;
  message: string;
  timestamp: string;
}

export interface Message {
  type:
    | 'question'
    | 'answer'
    | 'event'
    | 'task'
    | 'action'
    | 'admin'
    | 'system';
  text: string;
  id?: number;
  goalOptions?: string[];
  weekNumber?: number;
  sessionType?: string;
  senderName?: string;
  taskId?: string;
  suggestion?: any;
  workout?: any;
  isServiceChange?: boolean;
  serviceName?: string;
}

export interface SystemMessage {
  id: string;
  message: string;
  timestamp: string;
  senderName: string;
}

export interface Task {
  id: string;
  chatId: string;
  text: string;
  sessionType?: string;
  taskId?: string;
}

type Chat = {
  avatar: string;
  name: string;
  text: string;
  time: number;
  textCount: number;
  dot: number;
};

interface Ai_Voice_Message {
  type:
    | "user_message"
    | "assistant_message"
    | "chat_metadata"
    | "socket_connected"
    | "user_interruption";
  fromText: boolean;
  id?: string;
  message: { content: string; role: string };
  models?: { prosody: { scores: any } };
  receivedAt?: Date;
}

interface UpdateTrainingPlanPayload {
  jobId: string;
  data: {
    coaches?: string[];
    lastActiveCoach?: string | null; // Add this line
    serviceName?: string;
    lastUpdated?: string;
    suggestion?: any;
  };
}

// Define the type for the API response
interface UpdateTrainingPlanResponse {
  message: string;
  updatedDocument: {
    jobId: string;
    coaches: string[];
    lastActiveCoach: string | null; // Add this line
    serviceName: string;
    lastUpdated: string;
    suggestion?: any;
  };
}

// Type definitions
interface Message {
  type:
    | "question"
    | "answer"
    | "event"
    | "task"
    | "action"
    | "admin"
    | "system"
    | "log"
    | "file"
    | "error";
  text: string;
  timestamp?: string;
  id?: number;
  goalOptions?: string[];
  weekNumber?: number;
  sessionType?: string;
  senderName?: string;
  taskId?: string;
  suggestion?: any;
  workout?: any;
  keywords?: string[];
  isServiceChange?: boolean;
  serviceName?: string;
  hasSuggestions?: boolean;
  logType?: string;
  lastUserMessage?: string | null | undefined;
  file?: {
    name: string;
    type: string;
    id: string;
  };
  PlanID?: string;
  locations?: Array<{
    name: string;
    category: string;
    address: string;
    distance: string;
    coordinates: string;
  }>;
  // Add the following fields based on your usage
  data?: any; // You can refine this to the exact structure if you know what 'data' should look like
  task?: any; // You can refine this to the expected type for 'task'
}

interface ParsedMessage {
  message: Message;
  suggestion?: any;
  task?: {
    data: any;
    id: string | number;
    timestamp: string;
  };
}

interface ChatContent {
  type: "task" | "suggestion";
  text?: string;
  id?: string | number;
  timestamp?: string;
  senderName?: string;
  data: any;
}

interface SystemMessageType extends SystemMessage {
  type: "system";
}

interface SystemMessage {
  id: string | number;
  message: string;
  timestamp: string;
  senderName: string;
  text?: string;
}

interface Task {
  session_type?: string;
  PlanID?: string;
  duration?: number;
  segments?: any[];
  data?: any; // Optional data field for tasks
  id?: string | number; // Optional id field for tasks
  timestamp?: string; // Optional timestamp for tasks
  text?: string; // Optional text field for tasks
}

interface TaskResult {}

interface ChatState {
  chatMessages: Message[];
  chatContent: ChatContent[];
  isWebSocketReady: boolean;
  isWebSocketConnected: boolean;
  pendingResponse: boolean;
  currentQuestion: string | null;
  answer: string;
  taskResults: TaskResult[];
  coachName: string | null;
  selectedJobId: string;
  tempGoalOptions: string[];
  selectedSuggestions: string[];
  pendingQuestionQueue: any[];
  tasks: Task[];
  systemMessages: SystemMessage[];
  userInput: string;
  tempCoachName: string | null;
  currentSuggestionBubbleHeight: number;
  serviceName: string;
  suggestions: Record<string, any>;
  planSuggestions: any;
  humeAccessToken: string | null;
  ai_voice_messages: Ai_Voice_Message[];
  logArray: Message[];
  uploading: boolean;
  coaches: string[];
  lastActiveCoach: string | null;
  lastUserMessage?: string | null | undefined;
  hasErrorMessage: boolean;
  lastPlanNameUpdateTime: number;
}

interface SendChatMessageOptions {
  display: boolean;
  isServiceChange?: boolean;
  type?: string;
  sendToBackend?: boolean;
  timestamp?: string; // Add this line
}

interface SendChatMessagePayload {
  msg?: string;
  options?: SendChatMessageOptions;
  timestamp?: string; // Add this line to accept an optional timestamp
}

export type {
  ChatContent,
  Chat,
  Message,
  SystemMessageType,
  SystemMessage,
  Task,
  ChatState,
  SendChatMessageOptions,
  SendChatMessagePayload,
  Ai_Voice_Message,
  UpdateTrainingPlanPayload,
  UpdateTrainingPlanResponse,
  ParsedMessage,
};

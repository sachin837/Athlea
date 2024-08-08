export type ChatType = 'general' | 'individual' | 'sequential';

export interface JobState {
  selectedJobId: string | null;
  coachName: string | null;
  trainingPlans: TrainingPlan[];
  loading: boolean;
  initialMessage: string | null;
  isWebSocketReady: boolean;
  chatType: ChatType;
  previousChatType: ChatType;
  previousCoachName: string | null;
  needInitialMessages: boolean;
  serviceName: string; // Add this line
}

export interface JobSelectPayload {
  jobId: string;
  coachName: string | null;
  chatType: ChatType;
}

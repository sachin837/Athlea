import { TrainingPlan } from "@/types/plan";

interface JobState {
  selectedJobId: string | null;
  coachName: string | null;
  trainingPlans: TrainingPlan[];
  loading: boolean;
  initialMessage: string | null;
  isWebSocketReady: boolean;
  previousCoachName: string | null;
  needInitialMessages: boolean;
  serviceName: string; // Add this line
  serviceOptions: boolean;
  coaches: string[];
  lastActiveCoach: string | null;
  temporaryCoaches: string[];
  skipInitialMessageSend: boolean;
  planTitle: string | null | undefined
}

interface JobSelectPayload {
  jobId: string;
  coachName: string | null;
}

export type { JobState, JobSelectPayload };

interface TrainingPlan {
  lastUpdated: string;
  jobId: string;
  dateAdded: string;
  coaches?: string[];
  coachName?: string;
  serviceName?: string;
  planTitle?: string
}

export type { TrainingPlan };

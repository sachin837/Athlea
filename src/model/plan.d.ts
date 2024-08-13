export interface TrainingPlan {
  jobId: string;
  dateAdded: string;
  coachName?: string;
  chatType: 'general' | 'individual' | 'sequential';
}

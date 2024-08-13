import {
  Dispatch,
  PayloadAction,
  createAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit'
import {RootState} from '../index'

let idCounter = 0

const getRandomFloat = (f,s) => Math.max(Math.random() * s, f)
const getRandomInt = (f,s) => Math.floor(getRandomFloat(f,s))

interface DailyPlanItem {
  name: string;
  iconSize: number;
  gradientColors: string;
  ActivityName: string;
  ActivityCategory: string;
  Duration?: string;
  Activities: Activity[];
}
interface TrainingPanelContentItem {
  selectedDate: string;
  MessageContent: string;
  TSS: number;
  ActivityLoadHour: number;
  Activities: number;
  phase: string;
  TotalMET?: number; // This line is added to track total MET for the day
  TotalCalories?: number; // This line is added to track total calories for the day
  TotalEnergy?: number; // This line is added to track total energy for the day
  CategoryLoads: Record<string, number>;
  CompletedLoads?: Record<string, number>; // This line is added to track completed loads by category
}

// Define state type for training slice
interface TrainingState {
  trainingPanelContent: TrainingPanelContentItem[];
  isLoading: boolean;
  graphDataLoading: boolean;
  graphData: any[]; // Define more specific types based on your data structure
  graphData2: any[];
  completedActivities: string[];
}

// Define type for the payload expected by completeActivity action
interface CompleteActivityPayload {
  date: string;
  categoryName: string;
  load: number;
}

interface Activity {
  id: string;
  category: string; // Assumed to be a string; adjust as necessary based on actual data structure
  Date: string;
  AiIcon?: boolean;
}

interface DailyPlan {
  ActivityCategory: string;
  Activities: Activity[];
}

interface TrainingPanelContentItem {
  selectedDate: string;
  DailyPlan: DailyPlan[];
}

interface Action {
  area: string;
  description: string;
  bodyPart: string;
  category: 'Nutrition' | 'Strength' | 'Endurance' | 'Recovery';
  calories?: number; // Optional since not all categories will use this
  energy?: number; // Optional since not all categories will use this
  MET?: number; // Optional since not all categories will use this
  load?: number; // Optional since not all categories will use this
  TSS?: number; // Optional since not all categories will use this
}

interface Activity {
  id: string;
  Header: string;
  ActivityText: string;
  BodyPart: string;
  Category: Category;
  Date: string;
  Time: string;
  Calories?: number;
  Energy?: number;
  MET?: number;
  Load?: number;
  TSS?: number;
}

interface State {
  trainingPanelContent: TrainingPanelContentItem[];
}

interface Plan {
  ActivityCategory: string;
  Activities: Activity[];
}

interface ActivityDetail {
  activity: Activity;
  category: string;
  load: number;
}

interface State {
  training: {
    trainingPanelContent: TrainingPanelContentItem[];
  };
}

interface GraphDataItem {
  date: string;
  load?: number;
  met?: number;
  calories?: number;
  energy?: number;
  additionalData?: number;
  selectedActivityLoad?: number;
  selectedActivityCalories?: number;
  selectedActivityEnergy?: number;
}

interface CompleteActivityPayload {
  date: string;
  categoryName: string;
  load: number;
}

interface ActivityActionPayload {
  activityId: string;
  date?: string;
  category?: string;
  load?: number;
}

interface SetCategoryPayload {
  category: string;
}

interface GraphDataPayload {
  activity: ActivityDetail;
}

interface MarkActivityAsCompletedPayload {
  activityId: string;
}

interface UnmarkActivityAsCompletedPayload {
  activityId: string;
  date: string;
}

interface CompleteActivityByIdPayload {
  activityId: string;
  date: string;
}

interface AddActivityAndUpdateLoadsPayload {
  activity: ActivityDetail;
  timeOption: string; // This could be 'Day', 'Week', etc., based on your implementation.
}

interface GenerateGraphDataPayload {
  activity: ActivityDetail;
}

type Category = 'Nutrition' | 'Strength' | 'Endurance' | 'Recovery';

// Types for the date range function
type Period = 'Day' | 'Week' | 'Month' | 'Year';

const generateId = (): string => {
  idCounter += 1
  const rawId = `activity-${idCounter}-${new Date().getTime()}`
  return rawId
}

const DailyPlan = [
  {
    name: 'strengthicon',
    iconSize: 1.75,
    gradientColors: 'theme.gradients.strength.colors',
    ActivityName: 'Lifting Session',
    ActivityCategory: 'Strength',
    Duration: '0:20:00',
    Activities: [
      {
        id: generateId(),
        Header: 'Warm Up',
        ActivityText: '10 mins of dynamic stretching',
        BodyPart: 'Full Body',
        MET: 2.5,
        Load: 2,
      },
      {
        id: generateId(),
        Header: 'Warm Up',
        ActivityText: '5 mins of light cardio to increase heart rate',
        BodyPart: 'Full Body',
        MET: 3.5,
        Load: 4,
      },
      {
        id: generateId(),
        Header: 'Main Set',
        ActivityText: '2 sets of 12-15 reps Chin-ups',
        BodyPart: 'Arms',
        MET: 8,
        Load: 8,
      },
      {
        id: generateId(),
        Header: 'Wind Down',
        ActivityText: '10 mins of static stretching',
        BodyPart: 'Full Body',
        MET: 2.3,
        Load: 2,
      },
      {
        id: generateId(),
        Header: 'Assessment',
        ActivityText: 'Record your weights and reps',
        BodyPart: 'None',
        MET: 1.5,
        Load: 1,
      },
    ],
  },
  {
    name: 'enduranceicon',
    iconSize: 2.5,
    gradientColors: 'theme.gradients.endurance.colors',
    ActivityName: 'Cycling Session',
    ActivityCategory: 'Endurance',
    Duration: '1:00:00',
    Activities: [
      {
        id: generateId(),
        Header: 'Warm Up',
        ActivityText: '5 mins low intensity',
        BodyPart: 'Legs',
        Load: 10,
        TSS: 20,
      },
      {
        id: generateId(),
        Header: 'Main Set',
        ActivityText: '10 mins in Z2',
        BodyPart: 'Legs',
        Load: 10,
        TSS: 40,
      },
      {
        id: generateId(),
        Header: 'Main Set',
        ActivityText: '5 mins in Z4',
        BodyPart: 'Legs',
        Load: 10,
        TSS: 60,
      },
      {
        id: generateId(),
        Header: 'Main Set',
        ActivityText: '5 mins in Z3',
        BodyPart: 'Legs',
        Load: 10,
        TSS: 20,
      },
      {
        id: generateId(),
        Header: 'Wind Down',
        ActivityText: '10 mins cool down',
        BodyPart: 'Legs',
        Load: 10,
        TSS: 20,
      },
    ],
  },
  {
    name: 'recoveryicon',
    iconSize: 3,
    gradientColors: 'theme.gradients.recovery.colors',
    ActivityName: 'Comprehensive Recovery Plan',
    ActivityCategory: 'Recovery',
    Activities: [
      {
        id: generateId(),
        Header: 'Morning Hydration',
        ActivityText:
          'Glass of lemon water to kickstart digestion and hydration',
        BodyPart: 'Full Body',
      },
      {
        id: generateId(),
        Header: 'Protein-Rich Snack',
        ActivityText: 'Greek yogurt with honey for muscle repair',
        BodyPart: 'Full Body',
      },
      {
        id: generateId(),
        Header: 'Antioxidant Boost',
        ActivityText: 'Green tea to support recovery and reduce inflammation',
        BodyPart: 'Full Body',
      },
      {
        id: generateId(),
        Header: 'Evening Relaxation',
        ActivityText: 'Chamomile tea to promote relaxation and better sleep',
        BodyPart: 'Full Body',
      },
      {
        id: generateId(),
        Header: 'Sleep Optimization',
        ActivityText:
          'Magnesium supplement to support muscle recovery and improve sleep quality',
        BodyPart: 'Full Body',
      },
    ],
  },
  {
    name: 'nutritionicon',
    iconSize: 2,
    gradientColors: 'theme.gradients.nutrition.colors',
    ActivityName: 'Daily Meal Plan',
    ActivityCategory: 'Nutrition',
    Activities: [
      {
        id: generateId(),
        Header: 'Breakfast',
        ActivityText: 'Oatmeal with sliced bananas and almonds',
        BodyPart: 'Full Body',
        Calories: 350,
        Energy: 30,
      },
      {
        id: generateId(),
        Header: 'Breakfast',
        ActivityText: 'Greek yogurt with honey',
        BodyPart: 'Full Body',
        Calories: 150,
        Energy: 20,
      },
      {
        id: generateId(),
        Header: 'Post Workout',
        ActivityText: 'Eggs with toast',
        BodyPart: 'Full Body',
        Calories: 300,
        Energy: 35,
      },
      {
        id: generateId(),
        Header: 'Lunch',
        ActivityText: 'Mixed green salad with vinaigrette dressing',
        BodyPart: 'Full Body',
        Calories: 200,
        Energy: 25,
      },
      {
        id: generateId(),
        Header: 'Lunch',
        ActivityText: 'Fresh fruit salad',
        BodyPart: 'Full Body',
        Calories: 120,
        Energy: 15,
      },
      {
        id: generateId(),
        Header: 'Dinner',
        ActivityText: 'Baked salmon with sweet potato and asparagus',
        BodyPart: 'Full Body',
        Calories: 600,
        Energy: 45,
      },
      {
        id: generateId(),
        Header: 'Dinner',
        ActivityText: 'Whole grain dinner roll',
        BodyPart: 'Full Body',
        Calories: 80,
        Energy: 10,
      },
      {
        id: generateId(),
        Header: 'Dinner',
        ActivityText:
          'Spinach salad with avocado, tomatoes, and balsamic glaze',
        BodyPart: 'Full Body',
        Calories: 250,
        Energy: 20,
      },
    ],
  },
]

const TrainingPanelContent = [
  {
    selectedDate: '2024-03-30',
    MessageContent:
      'Circuit training incorporating both aerobic exercises and strength work for balanced fitness.',
    TSS: 90,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'Transition',
    CategoryLoads: {
      Strength: 30,
      Endurance: 40,
      Recovery: 10,
      Nutrition: 5,
      Wellbeing: 5,
    },
  },
  {
    selectedDate: '2024-03-31',
    MessageContent:
      'Circuit training incorporating both aerobic exercises and strength work for balanced fitness.',
    TSS: 90,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'Transition',
    CategoryLoads: {
      Strength: 28,
      Endurance: 42,
      Recovery: 12,
      Nutrition: 6,
      Wellbeing: 2,
    },
  },
  {
    selectedDate: '2024-04-01',
    MessageContent:
      'Circuit training incorporating both aerobic exercises and strength work for balanced fitness.',
    TSS: 90,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'Transition',
    CategoryLoads: {
      Strength: 25,
      Endurance: 45,
      Recovery: 15,
      Nutrition: 3,
      Wellbeing: 2,
    },
  },
  {
    selectedDate: '2024-04-02',
    MessageContent:
      'Circuit training incorporating both aerobic exercises and strength work for balanced fitness.',
    TSS: 91,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'Transition',
    CategoryLoads: {
      Strength: 32,
      Endurance: 38,
      Recovery: 10,
      Nutrition: 7,
      Wellbeing: 3,
    },
  },
  {
    selectedDate: '2024-04-03',
    MessageContent:
      'Circuit training incorporating both aerobic exercises and strength work for balanced fitness.',
    TSS: 92,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'Transition',
    CategoryLoads: {
      Strength: 33,
      Endurance: 37,
      Recovery: 12,
      Nutrition: 5,
      Wellbeing: 3,
    },
  },
  {
    selectedDate: '2024-04-04',
    MessageContent:
      'Circuit training incorporating both aerobic exercises and strength work for balanced fitness.',
    TSS: 91,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'Transition',
    CategoryLoads: {
      Strength: 29,
      Endurance: 41,
      Recovery: 15,
      Nutrition: 4,
      Wellbeing: 1,
    },
  },
  {
    selectedDate: '2024-04-05',
    MessageContent: 'Long distance cycling focused on endurance building.',
    TSS: 92,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'Prep',
    CategoryLoads: {
      Strength: 20,
      Endurance: 50,
      Recovery: 10,
      Nutrition: 7,
      Wellbeing: 3,
    },
  },
  {
    selectedDate: '2024-04-06',
    MessageContent: 'Long distance cycling focused on endurance building.',
    TSS: 120,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'Prep',
    CategoryLoads: {
      Strength: 18,
      Endurance: 55,
      Recovery: 12,
      Nutrition: 8,
      Wellbeing: 7,
    },
  },
  {
    selectedDate: '2024-04-07',
    MessageContent:
      'Today\'s workout plan encompasses a 1-hour cycling session focused on endurance, followed by a 20 minute strength training lifting session. The cycling includes a structured intensity progression, while the lifting session incorporates a variety of compound exercises. Nutritionally, the day is supported by a balanced meal plan.',
    TSS: 120,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'Prep',
    CategoryLoads: {
      Strength: 30,
      Endurance: 40,
      Recovery: 15,
      Nutrition: 10,
      Wellbeing: 5,
    },
  },
  {
    selectedDate: '2024-04-08',
    MessageContent:
      'Today\'s regimen includes a challenging 45-minute swim focusing on cardiovascular health, paired with a 30 minute yoga session aimed at improving flexibility and mental well-being.',
    TSS: 118,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'Prep',
    CategoryLoads: {
      Strength: 22,
      Endurance: 48,
      Recovery: 18,
      Nutrition: 7,
      Wellbeing: 5,
    },
  },
  {
    selectedDate: '2024-04-09',
    MessageContent: 'Long distance cycling focused on endurance building.',
    TSS: 117,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'Prep',
    CategoryLoads: {
      Strength: 17,
      Endurance: 53,
      Recovery: 20,
      Nutrition: 5,
      Wellbeing: 5,
    },
  },
  {
    selectedDate: '2024-04-10',
    MessageContent: 'Long distance cycling focused on endurance building.',
    TSS: 120,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'Prep',
    CategoryLoads: {
      Strength: 15,
      Endurance: 60,
      Recovery: 10,
      Nutrition: 10,
      Wellbeing: 5,
    },
  },
  {
    selectedDate: '2024-04-11',
    MessageContent: 'Long distance cycling focused on endurance building.',
    TSS: 145,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'Prep',
    CategoryLoads: {
      Strength: 20,
      Endurance: 65,
      Recovery: 5,
      Nutrition: 5,
      Wellbeing: 5,
    },
  },
  {
    selectedDate: '2024-04-12',
    MessageContent:
      'Speed work on the track to improve sprinting power and speed endurance.',
    TSS: 146,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'General',
    CategoryLoads: {
      Strength: 25,
      Endurance: 45,
      Recovery: 15,
      Nutrition: 10,
      Wellbeing: 5,
    },
  },
  {
    selectedDate: '2024-04-13',
    MessageContent:
      'Speed work on the track to improve sprinting power and speed endurance.',
    TSS: 143,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'General',
    CategoryLoads: {
      Strength: 30,
      Endurance: 40,
      Recovery: 10,
      Nutrition: 5,
      Wellbeing: 5,
    },
  },
  {
    selectedDate: '2024-04-14',
    MessageContent:
      'Speed work on the track to improve sprinting power and speed endurance.',
    TSS: 145,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'General',
    CategoryLoads: {
      Strength: 28,
      Endurance: 42,
      Recovery: 12,
      Nutrition: 6,
      Wellbeing: 2,
    },
  },
  {
    selectedDate: '2024-04-15',
    MessageContent:
      'Speed work on the track to improve sprinting power and speed endurance.',
    TSS: 142,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'General',
    CategoryLoads: {
      Strength: 25,
      Endurance: 45,
      Recovery: 15,
      Nutrition: 3,
      Wellbeing: 2,
    },
  },
  {
    selectedDate: '2024-04-16',
    MessageContent:
      'Speed work on the track to improve sprinting power and speed endurance.',
    TSS: 148,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'General',
    CategoryLoads: {
      Strength: 32,
      Endurance: 38,
      Recovery: 10,
      Nutrition: 7,
      Wellbeing: 3,
    },
  },
  {
    selectedDate: '2024-04-17',
    MessageContent:
      'Speed work on the track to improve sprinting power and speed endurance.',
    TSS: 142,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'General',
    CategoryLoads: {
      Strength: 33,
      Endurance: 37,
      Recovery: 12,
      Nutrition: 5,
      Wellbeing: 3,
    },
  },
  {
    selectedDate: '2024-04-18',
    MessageContent:
      'Speed work on the track to improve sprinting power and speed endurance.',
    TSS: 140,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'General',
    CategoryLoads: {
      Strength: 29,
      Endurance: 41,
      Recovery: 15,
      Nutrition: 4,
      Wellbeing: 1,
    },
  },
  {
    selectedDate: '2024-04-19',
    MessageContent:
      'Speed work on the track to improve sprinting power and speed endurance.',
    TSS: 142,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'General',
    CategoryLoads: {
      Strength: 20,
      Endurance: 50,
      Recovery: 10,
      Nutrition: 7,
      Wellbeing: 3,
    },
  },
  {
    selectedDate: '2024-04-20',
    MessageContent:
      'Speed work on the track to improve sprinting power and speed endurance.',
    TSS: 190,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'General',
    CategoryLoads: {
      Strength: 18,
      Endurance: 55,
      Recovery: 12,
      Nutrition: 8,
      Wellbeing: 7,
    },
  },
  {
    selectedDate: '2024-04-21',
    MessageContent:
      'Speed work on the track to improve sprinting power and speed endurance.',
    TSS: 192,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'General',
    CategoryLoads: {
      Strength: 30,
      Endurance: 40,
      Recovery: 15,
      Nutrition: 10,
      Wellbeing: 5,
    },
  },
  {
    selectedDate: '2024-04-22',
    MessageContent:
      'Speed work on the track to improve sprinting power and speed endurance.',
    TSS: 189,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'Specific 1',
    CategoryLoads: {
      Strength: 22,
      Endurance: 48,
      Recovery: 18,
      Nutrition: 7,
      Wellbeing: 5,
    },
  },
  {
    selectedDate: '2024-04-23',
    MessageContent:
      'Speed work on the track to improve sprinting power and speed endurance.',
    TSS: 190,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'Specific 1',
    CategoryLoads: {
      Strength: 22,
      Endurance: 48,
      Recovery: 18,
      Nutrition: 7,
      Wellbeing: 5,
    },
  },
  {
    selectedDate: '2024-04-24',
    MessageContent:
      'Speed work on the track to improve sprinting power and speed endurance.',
    TSS: 191,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'Specific 1',
    CategoryLoads: {
      Strength: 15,
      Endurance: 60,
      Recovery: 10,
      Nutrition: 10,
      Wellbeing: 5,
    },
  },
  {
    selectedDate: '2024-04-25',
    MessageContent:
      'Speed work on the track to improve sprinting power and speed endurance.',
    TSS: 122,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'Specific 1',
    CategoryLoads: {
      Strength: 20,
      Endurance: 65,
      Recovery: 5,
      Nutrition: 5,
      Wellbeing: 5,
    },
  },
  {
    selectedDate: '2024-04-26',
    MessageContent:
      'Speed work on the track to improve sprinting power and speed endurance.',
    TSS: 124,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'Specific 1',
    CategoryLoads: {
      Strength: 25,
      Endurance: 45,
      Recovery: 15,
      Nutrition: 10,
      Wellbeing: 5,
    },
  },
  {
    selectedDate: '2024-04-27',
    MessageContent:
      'Speed work on the track to improve sprinting power and speed endurance.',
    TSS: 126,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'Specific 1',
    CategoryLoads: {
      Strength: 30,
      Endurance: 40,
      Recovery: 10,
      Nutrition: 5,
      Wellbeing: 5,
    },
  },
  {
    selectedDate: '2024-04-28',
    MessageContent:
      'Speed work on the track to improve sprinting power and speed endurance.',
    TSS: 121,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'Specific 1',
    CategoryLoads: {
      Strength: 28,
      Endurance: 42,
      Recovery: 12,
      Nutrition: 6,
      Wellbeing: 2,
    },
  },
  {
    selectedDate: '2024-04-29',
    MessageContent:
      'Speed work on the track to improve sprinting power and speed endurance.',
    TSS: 120,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'Specific 1',
    CategoryLoads: {
      Strength: 25,
      Endurance: 45,
      Recovery: 15,
      Nutrition: 3,
      Wellbeing: 2,
    },
  },
  {
    selectedDate: '2024-04-30',
    MessageContent:
      'Speed work on the track to improve sprinting power and speed endurance.',
    TSS: 141,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'Specific 2',
    CategoryLoads: {
      Strength: 32,
      Endurance: 38,
      Recovery: 10,
      Nutrition: 7,
      Wellbeing: 3,
    },
  },
  {
    selectedDate: '2024-05-01',
    MessageContent:
      'Speed work on the track to improve sprinting power and speed endurance.',
    TSS: 139,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'Specific 2',
    CategoryLoads: {
      Strength: 29,
      Endurance: 41,
      Recovery: 15,
      Nutrition: 4,
      Wellbeing: 1,
    },
  },
  {
    selectedDate: '2024-05-02',
    MessageContent:
      'Speed work on the track to improve sprinting power and speed endurance.',
    TSS: 143,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'Specific 2',
    CategoryLoads: {
      Strength: 20,
      Endurance: 50,
      Recovery: 10,
      Nutrition: 7,
      Wellbeing: 3,
    },
  },
  {
    selectedDate: '2024-05-03',
    MessageContent:
      'Speed work on the track to improve sprinting power and speed endurance.',
    TSS: 144,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'Specific 2',
    CategoryLoads: {
      Strength: 18,
      Endurance: 55,
      Recovery: 12,
      Nutrition: 8,
      Wellbeing: 7,
    },
  },
  {
    selectedDate: '2024-05-04',
    MessageContent:
      'Speed work on the track to improve sprinting power and speed endurance.',
    TSS: 146,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'Specific 2',
    CategoryLoads: {
      Strength: 25,
      Endurance: 45,
      Recovery: 15,
      Nutrition: 10,
      Wellbeing: 5,
    },
  },
  {
    selectedDate: '2024-05-05',
    MessageContent:
      'Speed work on the track to improve sprinting power and speed endurance.',
    TSS: 91,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'Specific 3',
    CategoryLoads: {
      Strength: 29,
      Endurance: 41,
      Recovery: 15,
      Nutrition: 4,
      Wellbeing: 1,
    },
  },
  {
    selectedDate: '2024-05-06',
    MessageContent:
      'Speed work on the track to improve sprinting power and speed endurance.',
    TSS: 92,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'Specific 3',
    CategoryLoads: {
      Strength: 20,
      Endurance: 50,
      Recovery: 10,
      Nutrition: 7,
      Wellbeing: 3,
    },
  },
  {
    selectedDate: '2024-05-07',
    MessageContent:
      'Speed work on the track to improve sprinting power and speed endurance.',
    TSS: 90,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'Specific 3',
    CategoryLoads: {
      Strength: 25,
      Endurance: 45,
      Recovery: 15,
      Nutrition: 3,
      Wellbeing: 2,
    },
  },
  {
    selectedDate: '2024-05-08',
    MessageContent:
      'Speed work on the track to improve sprinting power and speed endurance.',
    TSS: 90,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'Specific 3',
    CategoryLoads: {
      Strength: 25,
      Endurance: 45,
      Recovery: 15,
      Nutrition: 3,
      Wellbeing: 2,
    },
  },
  {
    selectedDate: '2024-05-09',
    MessageContent:
      'Speed work on the track to improve sprinting power and speed endurance.',
    TSS: 90,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'Specific 3',
    CategoryLoads: {
      Strength: 25,
      Endurance: 45,
      Recovery: 15,
      Nutrition: 3,
      Wellbeing: 2,
    },
  },
  {
    selectedDate: '2024-05-10',
    MessageContent:
      'Speed work on the track to improve sprinting power and speed endurance.',
    TSS: 90,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'Specific 3',
    CategoryLoads: {
      Strength: 25,
      Endurance: 45,
      Recovery: 15,
      Nutrition: 3,
      Wellbeing: 2,
    },
  },
  {
    selectedDate: '2024-05-11',
    MessageContent:
      'Speed work on the track to improve sprinting power and speed endurance.',
    TSS: 90,
    ActivityLoadHour: getRandomFloat(0.5, 3.0),
    Activities: getRandomInt(1, 4),
    phase: 'Specific 3',
    CategoryLoads: {
      Strength: 25,
      Endurance: 45,
      Recovery: 15,
      Nutrition: 3,
      Wellbeing: 2,
    },
  },
]

interface TotalCalculations {
  calories: number;
  energy: number;
}

const calculateStrengthTotalMETForContent = (
  content: TrainingPanelContentItem,
  dailyPlan: DailyPlanItem[],
): number => {
  return dailyPlan.reduce((totalMET, plan) => {
    if (plan.ActivityCategory === 'Strength') {
      const planTotalMET = plan.Activities.reduce(
        (total, activity) => total + (activity.MET || 0),
        0,
      )
      return totalMET + planTotalMET
    }
    return totalMET
  }, 0)
}

const calculateTotalCaloriesAndEnergyForContent = (
  content: TrainingPanelContentItem,
  dailyPlan: DailyPlanItem[],
): TotalCalculations => {
  return dailyPlan.reduce(
    (totals, plan) => {
      const planTotals = plan.Activities.reduce(
        (accum, activity) => {
          accum.calories += activity.Calories || 0
          accum.energy += activity.Energy || 0
          return accum
        },
        {calories: 0, energy: 0},
      )
      totals.calories += planTotals.calories
      totals.energy += planTotals.energy
      return totals
    },
    {calories: 0, energy: 0},
  )
}

const mergeDailyPlanWithTrainingPanelContent = (
  trainingPanelContent: TrainingPanelContentItem[],
  dailyPlan: DailyPlanItem[],
): TrainingPanelContentItem[] => {
  return trainingPanelContent.map(content => {
    const totalStrengthMET = calculateStrengthTotalMETForContent(
      content,
      dailyPlan,
    )
    const totals = calculateTotalCaloriesAndEnergyForContent(
      content,
      dailyPlan,
    )

    // Initialize `acc` as Record<string, number> to allow string indexing.
    const initializedCompletedLoads: Record<string, number> = Object.keys(
      content.CategoryLoads,
    ).reduce<Record<string, number>>((acc, category) => {
      acc[category] = 0 // Initialize completed load for each category to 0
      return acc
    }, {})

    return {
      ...content,
      DailyPlan: [...dailyPlan], // Attach the entire DailyPlan
      TotalMET: totalStrengthMET, // Include the total MET calculation for strength activities
      TotalCalories: totals.calories, // Include the total calories calculation
      TotalEnergy: totals.energy, // Include the total energy calculation
      CompletedLoads: initializedCompletedLoads, // Include the initialized category loads
    }
  })
}

const updatedTrainingPanelContent = mergeDailyPlanWithTrainingPanelContent(
  TrainingPanelContent,
  DailyPlan,
)

const generateDateRange = (start: string, period: Period): string[] => {
  const startDate = new Date(start)
  const dates: Date[] = [startDate]

  switch (period) {
  case 'Day':
    break
  case 'Week':
    for (let i = 1; i <= 6; i++) {
      const nextDate = new Date(startDate)
      nextDate.setDate(startDate.getDate() + i)
      dates.push(nextDate)
    }
    break
  case 'Month':
    const nextMonth = new Date(startDate)
    nextMonth.setMonth(startDate.getMonth() + 1)
    while (startDate < nextMonth) {
      startDate.setDate(startDate.getDate() + 1)
      dates.push(new Date(startDate))
    }
    break
  case 'Year':
    const nextYear = new Date(startDate)
    nextYear.setFullYear(startDate.getFullYear() + 1)
    while (startDate < nextYear) {
      startDate.setDate(startDate.getDate() + 1)
      dates.push(new Date(startDate))
    }
    break
  }
  return dates.map(date => date.toISOString().split('T')[0])
}

const findActivityAndCategory = (
  state: State,
  activityId: string,
): {activity: Activity; category: string} | null => {
  if (!state.trainingPanelContent) {
    console.log('Warning: state.trainingPanelContent is undefined or null')
    return null
  }

  for (const contentItem of state.trainingPanelContent) {
    if (Array.isArray(contentItem.DailyPlan)) {
      for (const plan of contentItem.DailyPlan) {
        for (const activity of plan.Activities) {
          if (activity.id === activityId) {
            return {
              activity,
              category: plan.ActivityCategory,
            }
          }
        }
      }
    } else {
      console.log(
        'Warning: DailyPlan is not an array or is missing in the contentItem',
      )
    }
  }

  console.log('Activity with ID', activityId, 'not found')
  return null
}

const getCurrentDate = () => {
  const now = new Date()
  return now.toISOString().split('T')[0] // Format as YYYY-MM-DD
}

export const convertActionToActivity = (
  action: Action,
  option: string,
): Activity => {
  let activity: Activity = {
    id: generateId(),
    Header: action.area,
    ActivityText: action.description.replace(/^\s*•/, ''),
    BodyPart: action.bodyPart,
    Category: action.category,
    Date: getCurrentDate(),
    Time: option,
  }

  switch (action.category) {
  case 'Nutrition':
    activity.Calories = action.calories
    activity.Energy = action.energy
    break
  case 'Strength':
    activity.MET = action.MET
    activity.Load = action.load
    break
  case 'Endurance':
    activity.TSS = action.TSS
    activity.Load = action.load
    break
  }

  return activity
}

// In your reducer or action creator

const findActivityDetails = (
  state: State,
  activityId: string,
): ActivityDetail | null => {
  for (const contentItem of state.trainingPanelContent) {
    if (Array.isArray(contentItem.DailyPlan)) {
      for (const plan of contentItem.DailyPlan) {
        for (const activity of plan.Activities) {
          if (activity.id === activityId) {
            return {
              activity,
              category: plan.ActivityCategory,
              load: activity.Load || 0, // Assume Load is mandatory in Activity and add default to prevent runtime errors
            }
          }
        }
      }
    }
  }
  console.warn(`Activity with ID ${activityId} not found.`)
  return null
}

// Assuming your actions and async operations are defined here
export const generateGraphDataAsync = createAsyncThunk<
  void,
  Activity,
  {state: RootState; dispatch: Dispatch}
>('training/generateGraphDataAsync', async (activity, {dispatch, getState}) => {
  dispatch(startLoadingGraphData())

  try {
    const state = getState() // This will now correctly understand the state type
    const {trainingPanelContent} = state.training
    console.log('Generating graph data for activity:', trainingPanelContent)

    const loadArray: GraphDataItem[] = trainingPanelContent.map(content => ({
      date: content.selectedDate,
      load: content.CategoryLoads[activity.Category] || 0,
    }))

    let updatedGraphData: GraphDataItem[] = []
    let updatedGraphData2: GraphDataItem[] = []

    switch (activity.Category) {
    case 'Strength':
      const metArray: GraphDataItem[] = trainingPanelContent.map(content => ({
        date: content.selectedDate,
        met: content.TotalMET,
      }))

      updatedGraphData2 = loadArray.map(data => {
        if (data.date === activity.Date) {
          return {...data, selectedActivityLoad: activity.Load}
        }
        return data
      })

      updatedGraphData = metArray.map(data => {
        if (data.date === activity.Date) {
          return {...data, additionalData: activity.MET}
        }
        return data
      })
      break
    case 'Nutrition':
      const caloriesArray: GraphDataItem[] = trainingPanelContent.map(
        content => ({
          date: content.selectedDate,
          calories: content.TotalCalories,
        }),
      )

      const energyArray: GraphDataItem[] = trainingPanelContent.map(
        content => ({
          date: content.selectedDate,
          energy: content.TotalEnergy,
        }),
      )

      updatedGraphData = caloriesArray.map(data => {
        if (data.date === activity.Date) {
          return {...data, selectedActivityCalories: activity.Calories}
        }
        return data
      })

      updatedGraphData2 = energyArray.map(data => {
        if (data.date === activity.Date) {
          return {...data, selectedActivityEnergy: activity.Energy}
        }
        return data
      })
      break
    case 'Endurance':
      const tssArray: GraphDataItem[] = trainingPanelContent.map(content => ({
        date: content.selectedDate,
        load: content.TSS,
      }))

      updatedGraphData = tssArray.map(data => {
        if (data.date === activity.Date) {
          return {...data, additionalData: activity.TSS}
        }
        return data
      })

      updatedGraphData2 = loadArray.map(data => {
        if (data.date === activity.Date) {
          return {...data, selectedActivityLoad: activity.Load}
        }
        return data
      })
      break
    }

    dispatch(setGraphData(updatedGraphData))
    dispatch(setGraphData2(updatedGraphData2))

    dispatch(finishLoadingGraphData())
  } catch (error) {
    console.error('Error in generateGraphDataAsync:', error)
    dispatch(finishLoadingGraphData())
  }
})

export const trainingSlice = createSlice({
  name: 'training',
  initialState: {
    trainingPanelContent: updatedTrainingPanelContent,
    completedActivities: [] as string[],
    isLoading: false,
    graphDataLoading: false,
    graphData: [] as GraphDataItem[],
    graphData2: [] as GraphDataItem[],
  } as TrainingState,

  reducers: {
    startLoading: state => {
      state.isLoading = true
    },
    startLoadingGraphData: state => {
      state.graphDataLoading = true
    },
    finishLoadingGraphData: state => {
      state.graphDataLoading = false
    },
    setGraphData: (state, action: PayloadAction<GraphDataItem[]>) => {
      state.graphData = action.payload
    },
    setGraphData2: (state, action: PayloadAction<GraphDataItem[]>) => {
      state.graphData2 = action.payload
    },
    setTrainingPanelContent: (
      state,
      action: PayloadAction<TrainingPanelContentItem[]>,
    ) => {
      state.trainingPanelContent = action.payload
    },
    setSelectedCategory: (state, action: PayloadAction<SetCategoryPayload>) => {
      state.selectedCategory = action.payload.category
    },
    completeActivity: (
      state,
      action: PayloadAction<CompleteActivityPayload>,
    ) => {
      const {date, categoryName, load} = action.payload
      const contentIndex = state.trainingPanelContent.findIndex(
        content => content.selectedDate === date,
      )
      if (contentIndex !== -1) {
        const completedLoad =
          state.trainingPanelContent[contentIndex].CompletedLoads?.[
            categoryName
          ] || 0
        state.trainingPanelContent[contentIndex].CompletedLoads![categoryName] =
          completedLoad + load
      }
    },
    markActivityAsCompleted: (
      state,
      action: PayloadAction<MarkActivityAsCompletedPayload>,
    ) => {
      const {activityId} = action.payload
      if (!state.completedActivities.includes(activityId)) {
        state.completedActivities.push(activityId)
      }
    },
    unmarkActivityAsCompleted: (
      state,
      action: PayloadAction<UnmarkActivityAsCompletedPayload>,
    ) => {
      const {activityId, date} = action.payload
      const details = findActivityDetails(state, activityId)

      if (details) {
        const {category, load} = details
        const contentIndex = state.trainingPanelContent.findIndex(
          content => content.selectedDate === date,
        )

        if (
          contentIndex !== -1 &&
          state.trainingPanelContent[contentIndex].CompletedLoads[category] !==
            undefined
        ) {
          state.trainingPanelContent[contentIndex].CompletedLoads[category] =
            Math.max(
              0,
              state.trainingPanelContent[contentIndex].CompletedLoads[
                category
              ] - load,
            )
        }

        state.completedActivities = state.completedActivities.filter(
          id => id !== activityId,
        )
      }
    },
    completeActivityById: (
      state,
      action: PayloadAction<CompleteActivityByIdPayload>,
    ) => {
      state.isLoading = true
      const {activityId, date} = action.payload
      // Assuming a function to find an activity and its category
      const result = findActivityAndCategory(state, activityId)
      if (!result) {
        console.warn(`Activity with ID ${activityId} not found.`)
        state.isLoading = false
        return
      }
      const {activity, category} = result
      const contentIndex = state.trainingPanelContent.findIndex(
        content => content.selectedDate === date,
      )
      if (contentIndex !== -1 && category) {
        const loads =
          state.trainingPanelContent[contentIndex].CompletedLoads || {}
        loads[category] = (loads[category] || 0) + activity.load
        state.trainingPanelContent[contentIndex].CompletedLoads = loads
      }
      state.isLoading = false
    },
    addActivityAndUpdateLoads: (
      state: TrainingState,
      action: PayloadAction<AddActivityAndUpdateLoadsPayload>,
    ) => {
      const {activity, timeOption} = action.payload
      const dateRange = generateDateRange(getCurrentDate(), timeOption)
      dateRange.forEach(date => {
        let contentEntry = state.trainingPanelContent.find(
          entry => entry.selectedDate === date,
        )
        if (!contentEntry) {
          contentEntry = {
            selectedDate: date,
            DailyPlan: [],
          }
          state.trainingPanelContent.push(contentEntry)
        }

        let categoryPlan = contentEntry.DailyPlan.find(
          plan => plan.ActivityCategory === activity.Category,
        )
        if (!categoryPlan) {
          categoryPlan = {
            ActivityCategory: activity.Category,
            Activities: [],
          }
          contentEntry.DailyPlan.push(categoryPlan)
        }

        const activityForDate = {...activity, Date: date, AiIcon: true}
        const existingActivityIndex = categoryPlan.Activities.findIndex(
          a => a.id === activityForDate.id,
        )
        if (existingActivityIndex === -1) {
          categoryPlan.Activities.push(activityForDate)
        }
      })
    },
    generateGraphData: (
      state,
      action: PayloadAction<GenerateGraphDataPayload>,
    ) => {
      const {activity} = action.payload

      // Assuming 'trainingPanelContent' is available in your state and contains the relevant data
      // First, let's get the MET values

      const loadArray = state.trainingPanelContent.map(content => ({
        date: content.selectedDate,
        load: content.CategoryLoads[activity.category] || 0,
      }))

      // Now, if the activity category is 'Strength', let's update the MET data for the matching date
      if (activity.category === 'Strength') {
        const metArray = state.trainingPanelContent.map(content => ({
          date: content.selectedDate,
          met: content.TotalMET,
        }))

        const updatedGraphData2 = loadArray.map(data => {
          if (data.selectedDate === activity.Date) {
            return {...data, selectedActivityLoad: activity.Load}
          }
          return data
        })
        // This creates a new array with the updated data
        const updatedGraphData = metArray.map(data => {
          if (data.selectedDate === activity.Date) {
            return {...data, selectedActivityMET: activity.MET}
          }
          return data
        })

        // Assuming you have a graphData array in your state to hold this data
        state.graphData = updatedGraphData
        state.graphData2 = updatedGraphData2
      } else if (activity.category === 'Nutrition') {
        // Handle the case for 'Nutrition' category

        const caloriesArray = state.trainingPanelContent.map(content => ({
          date: content.selectedDate,
          calories: content.TotalCalories,
        }))

        const energyArray = state.trainingPanelContent.map(content => ({
          date: content.selectedDate,
          energy: content.TotalEnergy,
        }))

        // Update the graph data for calories
        const updatedGraphData = caloriesArray.map(data => {
          if (data.selectedDate === activity.Date) {
            return {...data, selectedActivityCalories: activity.Calories}
          }
          return data
        })

        // Update the graph data for energy
        const updatedGraphData2 = energyArray.map(data => {
          if (data.selectedDate === activity.Date) {
            return {...data, selectedActivityEnergy: activity.Energy}
          }
          return data
        })

        // Update the state with the new graph data
        state.graphData = updatedGraphData
        state.graphData2 = updatedGraphData2
      } else if (activity.category === 'Endurance') {
        // Handle the case for 'Endurance' category

        const tssArray = state.trainingPanelContent.map(content => ({
          date: content.selectedDate,
          load: content.TotalTSS,
        }))

        // Update the graph data for TSS
        const updatedGraphData = tssArray.map(data => {
          if (data.selectedDate === activity.Date) {
            return {...data, additionalData: activity.TSS}
          }
          return data
        })

        const updatedGraphData2 = loadArray.map(data => {
          if (data.selectedDate === activity.Date) {
            return {...data, selectedActivityLoad: activity.load}
          }
          return data
        })

        // Update the state with the new graph data
        state.graphData = updatedGraphData
        state.graphData2 = updatedGraphData2
      }
    },
  },
})

export const {
  setTrainingPanelContent,
  generateGraphData,
  completeActivity,
  completeActivityById,
  markActivityAsCompleted,
  unmarkActivityAsCompleted,
  startLoading,
  addActivityAndUpdateLoads,
  startLoadingGraphData,
  finishLoadingGraphData,
  setGraphData,
  setGraphData2,
} = trainingSlice.actions

export default trainingSlice.reducer

import {
  PayloadAction,
  createAction,
  createSelector,
  createSlice,
  nanoid,
} from '@reduxjs/toolkit';

interface ActionData {
  category: string;
  bodyPart: string;
  text: string;
  id?: string;
  timestamp?: number;
  expiryTime?: number;
}

interface ActionState {
  actions: ActionData[];
}

const actionsData: ActionData[] = [
  {
    category: 'Endurance',
    bodyPart: 'legs',
    text: 'Running and cycling to improve lower body endurance and overall cardiovascular health.',
  },
  {
    category: 'Nutrition',
    bodyPart: 'full body',
    text: 'Balanced diet planning to support muscle growth and recovery across all body parts.',
  },
  {
    category: 'Strength',
    bodyPart: 'upper body',
    text: 'Weight lifting focusing on arms, chest, and back to increase upper body strength.',
  },
  {
    category: 'Wellbeing',
    bodyPart: 'head & neck',
    text: 'Meditation and neck stretches to reduce stress and tension in the head and neck area.',
  },
  {
    category: 'Recovery',
    bodyPart: 'arms',
    text: 'Cool-down exercises and stretches for the arms to promote recovery after intense workouts.',
  },
  {
    category: 'Endurance',
    bodyPart: 'full body',
    text: 'Swimming sessions that engage all body parts, enhancing cardiovascular endurance.',
  },
  {
    category: 'Strength',
    bodyPart: 'legs',
    text: 'Squats and lunges to build leg muscles and enhance lower body strength.',
  },
  {
    category: 'Nutrition',
    bodyPart: 'full body',
    text: 'Hydration strategy to maintain optimal performance and facilitate recovery.',
  },
  {
    category: 'Wellbeing',
    bodyPart: 'full body',
    text: 'Yoga practices for mental and physical health, improving flexibility and reducing stress.',
  },
  {
    category: 'Recovery',
    bodyPart: 'full body',
    text: 'Full body massage to relieve muscle soreness and accelerate the recovery process.',
  },
];

const initialStateActions: ActionData[] = actionsData.map(action => ({
  ...action,
  id: nanoid(),
  timestamp: Date.now(),
}));

// Utility function to format the duration in a human-readable format
const formatDuration = (duration: number): string => {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  const days = Math.floor(duration / (1000 * 60 * 60 * 24));

  let result = '';
  if (days > 0) result += `${days}d `;
  if (hours > 0) result += `${hours}h `;
  if (minutes > 0) result += `${minutes}m `;
  if (seconds > 0) result += `${seconds}s`;

  return result.trim();
};

// Selector to get the time left for a specific action by ID
export const selectTimeLeftForAction = createSelector(
  [
    (state: {actions: ActionState}, actionId: string) =>
      state.actions.actions.find(action => action.id === actionId),
    () => Date.now(),
  ],
  (action, currentTime) => {
    if (!action) return 'Action not found';
    const timeLeft = (action.expiryTime ?? 0) - currentTime;
    return timeLeft <= 0 ? 'Expired' : formatDuration(timeLeft);
  },
);

export const timerCompleted = createAction('actions/timerCompleted');

const calculateExpiryTime = (timeOption: string): number => {
  const now = new Date();
  switch (
    timeOption.toLowerCase() // Convert to lowercase for comparison
  ) {
    case 'day':
      now.setDate(now.getDate() + 1);
      break;
    case 'week':
      now.setDate(now.getDate() + 7);
      break;
    case 'month':
      now.setMonth(now.getMonth() + 1);
      break;
    case 'year':
      now.setFullYear(now.getFullYear() + 1);
      break;
    default:
      throw new Error('Invalid time option');
  }
  return now.getTime();
};

const actionsSlice = createSlice({
  name: 'actions',
  initialState: {actions: initialStateActions},
  reducers: {
    addAction: {
      reducer: (state: ActionState, action: PayloadAction<ActionData>) => {
        state.actions.push(action.payload);
      },
      prepare: (
        actionContent: Omit<ActionData, 'id' | 'timestamp' | 'expiryTime'>,
        timeOption: string,
      ) => {
        const id = nanoid();
        const timestamp = Date.now();
        const expiryTime = calculateExpiryTime(timeOption);
        return {payload: {...actionContent, id, timestamp, expiryTime}};
      },
    },
    updateAction: (
      state: ActionState,
      action: PayloadAction<{id: string; updatedAction: Partial<ActionData>}>,
    ) => {
      const index = state.actions.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.actions[index] = {
          ...state.actions[index],
          ...action.payload.updatedAction,
        };
      }
    },
    deleteAction: (state: ActionState, action: PayloadAction<string>) => {
      state.actions = state.actions.filter(a => a.id !== action.payload);
    },
    removeExpiredActions: (state: ActionState) => {
      const currentTime = Date.now();
      state.actions = state.actions.filter(
        action => (action.expiryTime ?? 0) > currentTime,
      );
    },
    setActions: (state: ActionState, action: PayloadAction<ActionData[]>) => {
      state.actions = action.payload;
    },
  },
});

export const {addAction, updateAction, deleteAction, setActions} =
  actionsSlice.actions;

export default actionsSlice.reducer;

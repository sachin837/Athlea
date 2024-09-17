import {
  configureStore,
  combineReducers,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import actionsReducer from './actions';
import notificationsReducer from './notifications';
import threadsReducer from './threads';
import trainingReducer from './training';
import postsReducer from './posts';
import authenticationReducer from './authentication';
import heartRateReducer from './healthKit/heartRateSlice';
import heartRateVariabilityReducer from './healthKit/heartRateVariabilitySlice';
import restingHeartRateReducer from './healthKit/restingHeartRateSlice';
import vo2MaxReducer from './healthKit/vo2MaxSlice';
import stepCountReducer from './healthKit/stepCountSlice';
import distanceReducer from './healthKit/distanceWalkingRunningSlice';
import energyReducer from './healthKit/energyBurnedSlice';
import sleepReducer from './healthKit/sleepAnalysisSlice';
import activitiesReducer from './healthKit/activitiesSlice';
import favoritesReducer from './favorites';
import userDataFromAuthReducer from './user/authUser';
import jobReducer from './jobs';
import chatReducer from './chat';
// import taskReducer from './task';
// import taskMessageReducer from './taskMessage';
// import calendarReducer from './calendar';
// import colorModeReducer from './colorMode';
// import sessionReducer from './session';
// import usersReducer from './user'

const reducer = combineReducers({
  threads: threadsReducer,
  notification: notificationsReducer,
  actions: actionsReducer,
  training: trainingReducer,
  posts: postsReducer,
  auth: authenticationReducer,
  authUser: userDataFromAuthReducer,
  // user: usersReducer,
  job: jobReducer,
  chat: chatReducer,
  heartRate: heartRateReducer,
  heartRateVariability: heartRateVariabilityReducer,
  restingHeartRate: restingHeartRateReducer,
  vo2Max: vo2MaxReducer,
  stepCount: stepCountReducer,
  distance: distanceReducer,
  energy: energyReducer,
  sleep: sleepReducer,
  exerciseTime: activitiesReducer,
  favorites: favoritesReducer,
  // other reducers can go here
});

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

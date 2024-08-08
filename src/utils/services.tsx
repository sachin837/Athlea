import {handleCreateTrainingPlanClick, handleIndividualCoachClick} from 'store';
import {AppDispatch} from '../store/store';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

export interface Service {
  name: string;
  description: string;
  coach: string;
  service: string;
  allLogos?: boolean;
  clickHandler: (
    dispatch: AppDispatch,
    user_id: string,
    navigate: NavigationProp<ParamListBase>['navigate'],
  ) => () => void;
}

export const allServices: Service[] = [
  {
    name: 'Generate weekly cycling plan',
    description: 'Create a comprehensive weekly plan for cycling training',
    coach: 'Cycling Coach',
    service: 'weekly_plan_generation',
    allLogos: true, // Render all logos
    clickHandler: (dispatch, user_id, navigate) => () => {
      dispatch(handleCreateTrainingPlanClick({user_id, navigate}));
    },
  },
  {
    name: 'Generate cycling session',
    description: 'Design a single cycling training session',
    coach: 'Cycling Coach',
    service: 'session_generation',
    clickHandler: (dispatch, user_id, navigate) => () => {
      dispatch(
        handleIndividualCoachClick({
          coachName: 'Cycling Coach',
          user_id,
          navigate,
          serviceName: 'session_generation',
        }),
      );
    },
  },
  {
    name: 'Generate weekly cycling plan',
    description: "Design a full week's cycling training schedule",
    coach: 'Cycling Coach',
    service: 'weekly_plan_generation',
    clickHandler: (dispatch, user_id, navigate) => () => {
      dispatch(
        handleIndividualCoachClick({
          coachName: 'Cycling Coach',
          user_id,
          navigate,
          serviceName: 'weekly_plan_generation',
        }),
      );
    },
  },
  {
    name: 'Generate weekly running plan',
    description: "Develop a full week's running training schedule",
    coach: 'Running Coach',
    service: 'weekly_plan_generation',
    clickHandler: (dispatch, user_id, navigate) => () => {
      dispatch(
        handleIndividualCoachClick({
          coachName: 'Running Coach',
          user_id,
          navigate,
          serviceName: 'weekly_plan_generation',
        }),
      );
    },
  },
  {
    name: 'Generate running session',
    description: 'Create an individual running workout',
    coach: 'Running Coach',
    service: 'session_generation',
    clickHandler: (dispatch, user_id, navigate) => () => {
      dispatch(
        handleIndividualCoachClick({
          coachName: 'Running Coach',
          user_id,
          navigate,
          serviceName: 'session_generation',
        }),
      );
    },
  },
  {
    name: 'Generate weekly nutrition plan',
    description: "Plan a week's worth of nutritional guidance",
    coach: 'Nutritionist',
    service: 'weekly_plan_generation',
    clickHandler: (dispatch, user_id, navigate) => () => {
      dispatch(
        handleIndividualCoachClick({
          coachName: 'Nutritionist',
          user_id,
          navigate,
          serviceName: 'weekly_plan_generation',
        }),
      );
    },
  },
  {
    name: 'Generate daily nutrition plan',
    description: "Plan a day's worth of nutritional guidance",
    coach: 'Nutritionist',
    service: 'daily_plan_generation',
    clickHandler: (dispatch, user_id, navigate) => () => {
      dispatch(
        handleIndividualCoachClick({
          coachName: 'Nutritionist',
          user_id,
          navigate,
          serviceName: 'daily_plan_generation',
        }),
      );
    },
  },
  {
    name: 'Generate weekly strength plan',
    description: 'Design a comprehensive weekly strength training program',
    coach: 'Strength Coach',
    service: 'weekly_plan_generation',
    clickHandler: (dispatch, user_id, navigate) => () => {
      dispatch(
        handleIndividualCoachClick({
          coachName: 'Strength Coach',
          user_id,
          navigate,
          serviceName: 'weekly_plan_generation',
        }),
      );
    },
  },
  {
    name: 'Generate strength session',
    description: 'Create a single strength training workout',
    coach: 'Strength Coach',
    service: 'session_generation',
    clickHandler: (dispatch, user_id, navigate) => () => {
      dispatch(
        handleIndividualCoachClick({
          coachName: 'Strength Coach',
          user_id,
          navigate,
          serviceName: 'session_generation',
        }),
      );
    },
  },
];

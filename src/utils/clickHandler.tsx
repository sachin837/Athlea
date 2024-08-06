import {
  handleCoachClick,
  handleCreateTrainingPlanClick,
  handleIndividualCoachClick,
} from 'store';
import {AppDispatch} from '../store/store';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

export const createTrainingPlanClickHandler =
  (
    dispatch: AppDispatch,
    user_id: string,
    navigate: NavigationProp<ParamListBase>['navigate'],
  ) =>
  () => {
    dispatch(handleCreateTrainingPlanClick({user_id, navigate}));
  };

export const createIndividualCoachClickHandler =
  (
    dispatch: AppDispatch,
    user_id: string,
    navigate: NavigationProp<ParamListBase>['navigate'],
    coachName: string,
    serviceName: string,
  ) =>
  () => {
    dispatch(
      handleIndividualCoachClick({coachName, user_id, navigate, serviceName}),
    );
  };

export const createCoachClickHandler =
  (
    dispatch: AppDispatch,
    user_id: string,
    navigate: NavigationProp<ParamListBase>['navigate'],
    coachName: string,
  ) =>
  () => {
    dispatch(handleCoachClick({coachName, user_id, navigate}));
  };

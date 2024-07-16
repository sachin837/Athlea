import {AppDispatch} from '../store'; // import your app's specific dispatch type
import {
  AsyncThunkAction,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit';
import {updateFavoriteData} from '../store/favorites';
import {ThunkDispatch} from 'redux-thunk'; // if needed, for more specific type support

// Define a type for the payload you expect from the initialFetchAction
interface InitialRecordResponse {
  date: string; // ISO string representing date
  lastRecorded: number; // Numeric value last recorded
}

// Define what the initial fetch action function signature should look like
// This function when called, returns an AsyncThunkAction
// that when dispatched, resolves with a payload of type InitialRecordResponse.
type InitialFetchAction = () => AsyncThunkAction<
  InitialRecordResponse,
  void,
  {}
>;

// Type for the result of the dispatch when an async action is dispatched
interface DispatchResult {
  meta: {
    requestStatus: 'fulfilled' | 'rejected' | 'pending';
  };
  payload?: InitialRecordResponse;
  error?: SerializedError; // This will be present if the requestStatus is 'rejected'
}

const updateFavoriteDataAfterInitialFetch = async (
  dispatch: AppDispatch,
  metricKey: string,
  initialFetchAction: InitialFetchAction,
): Promise<void> => {
  // Execute the initial fetch action and wait for the result
  const initialRecordAction: PayloadAction<
    InitialRecordResponse | unknown,
    string,
    {
      arg: void;
      requestId: string;
      requestStatus: 'fulfilled' | 'rejected' | 'pending';
    },
    SerializedError | never
  > = await dispatch(initialFetchAction());

  // Check if the action was fulfilled successfully
  if (
    initialRecordAction.meta.requestStatus === 'fulfilled' &&
    'payload' in initialRecordAction &&
    initialRecordAction.payload
  ) {
    const {date, lastRecorded} =
      initialRecordAction.payload as InitialRecordResponse; // Ensure casting after checking

    // Dispatch updateFavoriteData with the new data
    dispatch(
      updateFavoriteData({
        key: metricKey,
        newData: {lastRecorded},
        lastUpdated: new Date(date).getTime(), // Convert date string to milliseconds since the epoch
      }),
    );
  } else if (initialRecordAction.meta.requestStatus === 'rejected') {
    console.error('Fetching initial data failed:', initialRecordAction.error);
    // Handle error cases or perform necessary cleanup
  }
};

export default updateFavoriteDataAfterInitialFetch;

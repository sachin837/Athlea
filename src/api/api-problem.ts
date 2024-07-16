import {ApiResponse} from 'apisauce';
import {APIerrorsResponse, ReturnResponse} from './type';

export type GeneralApiProblem =
  /**
   * Times up.
   */
  | 'timeout'
  /**
   * Cannot connect to the server for some reason.
   */
  | 'cannot-connect'
  /**
   * The server experienced a problem. Any 5xx error.
   */
  | 'server'
  /**
   * We're not allowed because we haven't identified ourself. This is 401.
   */
  | 'unauthorized'
  /**
   * We don't have access to perform that request. This is 403.
   */
  | 'forbidden'
  /**
   * Unable to find that resource.  This is a 404.
   */
  | 'not-found'
  /**
   * All other 4xx series errors.
   */
  | 'rejected'
  /**
   * Something truly unexpected happened. Most likely can try again. This is a catch all.
   */
  | 'unknown'
  /**
   * The data we received is not in the expected format.
   */
  | 'bad-data';

/**
 * Attempts to get a common cause of problems from an api response.
 *
 * @param response The api response.
 */
function getGeneralApiProblem(response: ApiResponse<any>): GeneralApiProblem {
  switch (response.problem) {
    case 'CONNECTION_ERROR':
      return 'cannot-connect';
    case 'NETWORK_ERROR':
      return 'cannot-connect';
    case 'TIMEOUT_ERROR':
      return 'timeout';
    case 'SERVER_ERROR':
      return 'server';
    case 'UNKNOWN_ERROR':
      return 'unknown';
    case 'CLIENT_ERROR':
      switch (response.status) {
        case 401:
          return 'unauthorized';
        case 403:
          return 'forbidden';
        case 404:
          return 'not-found';
        default:
          return 'rejected';
      }
    default:
      return 'rejected';
  }
}

export function getErrorProblemValue(
  response: ApiResponse<any>,
): ReturnResponse<any> {
  const message = getGeneralApiProblem(response);
  return {
    data: {},
    errors: [
      {
        message: message,
      },
    ],
  };
}

export function getErrorGenerater(
  errors: APIerrorsResponse[] | undefined,
): ReturnResponse<any> {
  return {
    data: {},
    errors: errors || [{message: 'rejected'}],
  };
}

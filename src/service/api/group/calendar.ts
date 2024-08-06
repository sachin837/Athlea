import {request} from '../request'
import {API_LINKS} from '../../../_constants'


export const calendar = {
  getCalendar: (params: any) => request.get<any>(API_LINKS.calendar, params),
  uploadCalendar: (params: any) => request.post<any>(API_LINKS.calendar, params),
  deleteCalendar: (params: any) => request.delete<any>(API_LINKS.calendar, params),
}

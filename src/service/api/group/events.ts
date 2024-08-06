import {request} from '../request'
import {API_LINKS} from '../../../_constants'


export const events = {
  getEvents: (params: any) => request.get<any>(API_LINKS.events, params),
  uploadEvent: (params: any) => request.post<any>(API_LINKS.events, params),
  deleteEvent: (params: any) => request.delete<any>(API_LINKS.events, params),
}

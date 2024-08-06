import {request} from '../request'
import {API_LINKS} from '../../../_constants'


export const users = {
  getUser: (params: any) => request.post<any>(API_LINKS.users, params),
}

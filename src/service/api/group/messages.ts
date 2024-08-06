import {request} from '../request'
import {API_LINKS} from '../../../_constants'


export const messages = {
  getMessages: (params: any) => request.get<any>(API_LINKS.messages, params),
}

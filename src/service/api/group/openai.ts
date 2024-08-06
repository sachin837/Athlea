import {request} from '../request'
import {API_LINKS} from '../../../_constants'


export const openai = {
  getOpenAI: (params: any) => request.get<any>(API_LINKS.openai, params),
}

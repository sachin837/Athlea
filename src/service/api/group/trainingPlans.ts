import {request} from '../request'
import {API_LINKS} from '../../../_constants'

export const trainingPlans = {
  getTrainingPlans: (params: any) => request.get<{name: string}>(API_LINKS.trainingPlans, params),
  createTrainingPlan: (params: any) => request.post<any>(API_LINKS.trainingPlans, params),
}

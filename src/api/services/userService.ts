import HttpClient from '../HttpClient.ts'
import {ReturnResponse} from '../type'

const getUserData = async <TReturnType, TInput>(
  uid: TInput,
): Promise<ReturnResponse<TReturnType>> => {
  const response = await HttpClient.get<TReturnType, any>(`/user/${uid}`)
  console.log('Response:', response)
  return response
}

const updateUserData = async <TReturnType, TInput>(
  param: TInput,
): Promise<ReturnResponse<TReturnType>> => {
  const response = await HttpClient.put<TReturnType, TInput>(
    `/user/${param?.uid}`,
    param?.userInput,
  )
  return response
}

const deleteUserData = async <TReturnType, TInput>(
  uid: TInput,
): Promise<ReturnResponse<TReturnType>> => {
  const response = await HttpClient.delete<TReturnType>(`/user/${uid}`)
  return response
}

export const UserService = {
  getUserData,
  deleteUserData,
  updateUserData,
}

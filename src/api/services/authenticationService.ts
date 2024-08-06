import auth from '@react-native-firebase/auth'
import {IAuthUserResponse} from '../../model/user'
import {
  IAuthCredentialResponse,
  IAuthUserCredentialResponse,
} from '../../model/authentication'

const AuthStateChanged = (
  onAuthStateChanged: (user: IAuthUserResponse | any) => void,
) => {
  return auth().onAuthStateChanged(onAuthStateChanged)
}

const logout = async (): Promise<void | unknown> => await auth().signOut()

const signIn = async (
  email: string,
  password: string,
): Promise<{
  credentials?: IAuthUserCredentialResponse;
}> => {
  const credentials: IAuthUserCredentialResponse =
    await auth().signInWithEmailAndPassword(email, password)
  return {credentials}
}

const signUp = async (
  email: string,
  password: string,
): Promise<{
  credentials?: IAuthUserCredentialResponse;
}> => {
  const credentials = await auth().createUserWithEmailAndPassword(
    email,
    password,
  )
  return {credentials: credentials}
}

const updatePassword = async (password: string): Promise<void | unknown> =>
  await auth().currentUser?.updatePassword(password)

const updateEmail = async (email: string): Promise<void | unknown> =>
  await auth().currentUser?.verifyBeforeUpdateEmail(email)

const resetPassword = async (): Promise<void> => {
  const email = auth()?.currentUser?.email as string
  return await auth().sendPasswordResetEmail(email)
}

const signInWithCredential = async (
  credential: IAuthCredentialResponse,
): Promise<{
  credentials?: IAuthUserCredentialResponse;
}> => {
  const userCredential = await auth().signInWithCredential(credential)
  return {credentials: userCredential}
}

export const AuthenticationService = {
  signUp,
  signIn,
  logout,
  resetPassword,
  AuthStateChanged,
  signInWithCredential,
  updatePassword,
  updateEmail,
}

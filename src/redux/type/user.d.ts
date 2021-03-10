import { v4 as uuidv4 } from 'uuid';


interface IUser {
  id: string
  email: string
  firstname: string
  lastname: string
  description: string
  picture: string
  status: number
}

type UserState = {
  user?: IUser
}

type UserAction = {
  type: string
  id?: string
  data?: IUser
}

type DispatchUser = (args: UserAction) => UserAction

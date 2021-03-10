import { v4 as uuidv4 } from 'uuid';
import { IUser } from './user';


interface IEvent {
  id: string
  name: string
  invite_link: string
  date: Date,
  time: Date,
  description: string
  picture: string
  status: number
  capacity: number
  location : string
  attendees: IUser[]

}

type EventState = {
  events: IEvent[]
}


type EventAction = {
  type: string
  id?: string
  data: IEvent[]
}



type DispatchEvent = (args: EventAction) => EventAction
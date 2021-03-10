import { AttendeeState } from "./attendee"
import { EventState } from "./event"
import {UserState} from "./user"
export type GlobalState = {
  user: UserState,
  event: EventState,
  attendee : AttendeeState,
  messages : MessageState
}

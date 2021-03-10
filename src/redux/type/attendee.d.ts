import { IUser } from "./user"

  
  type AttendeeState = {
    attendees: IUser[]
  }
  
  
  type AttendeeAction = {
    type: string
    id?: string
    data: attendees[]
  }
  
  
  
  type DispatchAttendee = (args: AttendeeAction) => AttendeeAction
  
  
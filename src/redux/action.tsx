import * as actionTypes from "./actionTypes"
import { IUser, UserAction, DispatchUser } from "./type/user"
import { IEvent, EventAction, EventState, DispatchEvent } from "./type/event"
import { supabase } from '../initSupabase';
import { AttendeeAction, DispatchAttendee } from "./type/attendee";
import { event } from "react-native-reanimated";



//USER ACTION

export function getUser(id: string) {
  console.log("ASK GET_USER")

  const action: UserAction = {
    type: actionTypes.GET_USER,
    id: id,
  }

  return supaGetUser(action)
}

export function updateUser(n_user : IUser) {
  const action: UserAction = {
    type: actionTypes.UPDATE_USER,
    data : n_user
  }

  return supaUpdateUser(action)
}

export function supaUpdateUser(user: UserAction) {
  return (dispatch: DispatchUser) => {


    supabase
      .from('users')
      .update({firstname : user.data?.firstname, lastname : user.data?.lastname, description : user.data?.description})
      .eq("id", user.data.id).single().then((data) => {
        console.log("request")
        console.log(data)
        user.data = {
          id: data.data["id"],
          email: data.data["email"],
          firstname: data.data["firstname"],
          lastname: data.data["lastname"],
          description: data.data["description"],
          picture: data.data["picture"],
          status: data.data["status"]
        }

        console.log(user.data)


        dispatch(user)
      })
  }
}

export function removeUser() {
  const action: UserAction = {
    type: actionTypes.REMOVER_USER,
  }
  return (action)
}

export function supaGetUser(user: UserAction) {
  return (dispatch: DispatchUser) => {


    supabase
      .from('users')
      .select('*')
      .eq("id", user.id).single().then((data) => {
        console.log("request")
        console.log(data.data)
        user.data = {
          id: data.data["id"],
          email: data.data["email"],
          firstname: data.data["firstname"],
          lastname: data.data["lastname"],
          description: data.data["description"],
          picture: data.data["picture"],
          status: data.data["status"]
        }

        console.log(user.data)


        dispatch(user)
      })
  }
}


//EVENT ACTION


export function getEvents() {
  const action: EventAction = {
    type: actionTypes.GET_EVENTS,
    data: []
  }
  return supaGetEvent(action)
}


export function supaGetEvent(event: EventAction) {
  return (dispatch: DispatchEvent) => {

   
    supabase
      .from('event')
      .select('*')
      .then((data) => {
        console.log("request")
        console.log(data.data)
        for (var value of data.data) {
          if (value != null) {
            var tmp: IEvent = {
              id: value["id"],
              name: value["name"],
              invite_link: value["invite_link"],
              date: value["date"],
              time: value["time"],
              description: value["description"],
              picture: value["picture"],
              status: value["status"],
              capacity: value["capacity"],
              location: value["location"],
              attendees: []
            }
            event.data.push(tmp)



          }
        }
        console.log("end " + JSON.stringify(event.data))
        dispatch(event)
      })
  }
}


//ATTENDEE ACTION

export function getAttendees(event_id: string) {
  const action: AttendeeAction = {
    type: actionTypes.GET_ATTENDEES,
    id: event_id,
    data: []
  }
  return supaGetAttendee(action)
}

export function supaGetAttendee(attendee: AttendeeAction) {
  return (dispatch: DispatchAttendee) => {

    supabase.rpc("getAttendees", { arg_id: attendee.id }).then((a_data) => {
console.log("attendees")
      console.log(a_data)
      for (var a_value of a_data.data) {

        if (a_value != null) {
          var attendee_: IUser = {
            id: a_value["id"],
            email: a_value["email"],
            firstname: a_value["firstname"],
            lastname: a_value["lastname"],
            description: a_value["description"],
            picture: a_value["picture"],
            status: a_value["status"]
          }
          attendee.data?.push(attendee_)
        }
      }
      dispatch(attendee)

    })
  }
}


//CHAT ACTION


export function getMessages(event_id: string) {
  const action: MessageAction = {
    type: actionTypes.GET_MESSAGES,
    event_id: event_id,
  }
  return supaGetMessages(action)
}

export function supaGetMessages(message: MessageAction) {
  return (dispatch: DispatchMessage) => {

    supabase
      .from('messages')
      .select('*')
      .eq("event_id",message.event_id)
      .then((data)=>{

        if (data.data === null) {
          return
        }
        if (message.history == undefined) {
          message.history = []
        }
        for (var value of data.data) {
          var tmp : IMessage = {
            id: value["id"],
            event_id:  value["event_id"],
            user_id:  value["user_id"],
            timestamp:  value["timestamp"],
            content: value["content"],
          }
          message.history?.push(tmp)
        }

        dispatch(message)
      })

  }
}




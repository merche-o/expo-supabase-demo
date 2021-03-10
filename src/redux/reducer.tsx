import * as actionTypes from "./actionTypes"
import { AttendeeAction, AttendeeState } from "./type/attendee"
import { EventAction, EventState } from "./type/event"
import {IUser, UserAction, UserState}  from "./type/user"

const initialUserState: UserState = {
  user : undefined
}

const initialEventState: EventState = {
  events : []
}

const initialAttendeeState: AttendeeState = {
  attendees : []
}

const initialMessageState: MessageState = {
  messages : []
}

export const reducerUser = (
  state: UserState = initialUserState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case actionTypes.GET_USER:
    console.log("GET_USER")
      return {
        ...state,
        user: action.data,
      }
    case actionTypes.REMOVER_USER:

      return {
        ...state,
        user: undefined,
      }
    case actionTypes.UPDATE_USER:
      return{
        ...state,
        user:action.data
      }
  }
  return state
}

export const reducerEvent = (
  state: EventState = initialEventState,
  action: EventAction
): EventState => {
  switch (action.type) {
    case actionTypes.GET_EVENTS:
    console.log("GET_EVENT")
      return {
        ...state,
        events: action.data,
      }
  }
  return state
}

export const reducerAttendee = (
  state: AttendeeState = initialAttendeeState,
  action: AttendeeAction
): AttendeeState => {
  switch (action.type) {
    case actionTypes.GET_ATTENDEES:
      return {
        ...state,
        attendees: action.data,
      }
  }
  return state
}

export const reducerMessages = (
  state: MessageState = initialMessageState,
  action: MessageAction
): MessageState => {
  switch (action.type) {
    case actionTypes.GET_MESSAGES:
      return {
        ...state,
        messages: action.history || []
      }
  }
  return state
}
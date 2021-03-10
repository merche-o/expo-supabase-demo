import { createStore, applyMiddleware, Store, combineReducers } from "redux"
import { reducerAttendee, reducerEvent, reducerMessages, reducerUser } from "./reducer"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import {IUser, UserAction, UserState, DispatchUser}  from "./type/user"
import {GlobalState} from "./type/global"



/*
export const store: Store<UserState, UserAction> & {
  dispatch: DispatchUser
} = createStore(reducerUser, applyMiddleware(thunk))
*/

const rootReducer = combineReducers<GlobalState>({
    user : reducerUser,
    event: reducerEvent,
    attendee : reducerAttendee,
    messages : reducerMessages
})

const store = createStore(rootReducer, applyMiddleware(thunk))


export default store

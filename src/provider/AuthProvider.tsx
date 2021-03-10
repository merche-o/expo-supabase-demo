import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../initSupabase';
import { Session } from '@supabase/supabase-js';
import { Dispatch } from "redux"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { getUser, removeUser } from "../redux/action"
import {IUser, UserState, UserAction}  from "../redux/type/user"


type ContextProps = {
	user: null | boolean;
	session: Session | null;
};

const AuthContext = createContext<Partial<ContextProps>>({});

interface Props {
	children: React.ReactNode;
}

const AuthProvider  = (props: Props) => {
	// user null = loading
	const dispatch: Dispatch<any> = useDispatch()
	const userR: IUser = useSelector(
     (state: UserState) => state.user
	    )
	const [user, setUser] = useState<null | boolean>(null);
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		const session = supabase.auth.session();
		setSession(session);
		setUser(session ? true : false);
		const { data: authListener } = supabase.auth.onAuthStateChange(
			async (event, session) => {
				console.log(`Supabase auth event: ${event}`);
				if (event ==  "SIGNED_OUT") {
					console.log("remove")
					dispatch(removeUser())
				} else if (event == "SIGNED_IN") {
					dispatch(getUser(session.user.id))
				}
				setSession(session);
				setUser(session ? true : false);
			}
		);
		if (user == true && session != undefined) {
				dispatch(getUser(session.user.id))
		}
		return () => {
			authListener!.unsubscribe();
		};

	}, [user, dispatch, session]);

	return (
		<AuthContext.Provider
			value={{
				user,
				session,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };

import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { MainStackParamList } from '../types/navigation';
import { StackScreenProps } from '@react-navigation/stack';
import { supabase } from '../initSupabase';

import Layout from '../components/global/Layout';
import Text from '../components/utils/StyledText';
import { useEffect } from 'react';
import Colors from '../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalState } from '../redux/type/global';
import { IUser } from '../redux/type/user';
import { getAttendees, getEvents } from '../redux/action';
import { Dispatch } from "redux"

export default function ({
	navigation,
	route
}: StackScreenProps<MainStackParamList, 'SecondScreen'>) {
	const dispatch: Dispatch<any> = useDispatch()


	const userR: IUser | undefined = useSelector(
		(state: GlobalState) => state.user.user
	)

	const attendees: IUser[] = useSelector((state: GlobalState) => state.attendee.attendees)

	useEffect(() => {
		console.log(route.params.event_data)
		dispatch(getAttendees(route.params.event_data.id))
		console.log("second screen useEffect")
		console.log(attendees)
	}, [])
	
	function registerMe() {
		//should maybe use redux ?
		console.log("here")
		supabase
		.from('attendee')
		.insert([
		  { event_id: route.params.event_data.id, user_id: userR?.id, role :0, status : 0 },
		]).then((data)=>{
			console.log("added")
			console.log(route.params.event_data.id)
			console.log(data)
			dispatch(getAttendees(route.params.event_data.id))
		})
	}

	function unregisterMe() {
				//should maybe use redux ?
		console.log("here")
		supabase
		.from('attendee')
		.delete()
  		.eq('event_id', route.params.event_data.id).eq('user_id', userR?.id).then((data)=>{
			console.log("remove")
			console.log(route.params.event_data.id)
			console.log(data)
			dispatch(getAttendees(route.params.event_data.id))
		})
	}

		return (
		<Layout navigation={navigation} title="Second Screen" withBack>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			> 
				{/* This text using ubuntu font */}
				<Text bold> {route.params.event_data.name}</Text>
				<Text>Participants {"\n"}</Text>
				<View>
      {attendees.map(attendee => (
        <Text key={attendee.id}>{attendee.email} {"\n"} * {attendee.firstname} {attendee.lastname} *{"\n"}</Text>
      ))}
    </View>
 {attendees.some(e => e.id === userR.id) == false &&  
	<TouchableOpacity
					onPress={registerMe}
					style={{
						backgroundColor: Colors.primary,
						padding: 10,
						paddingHorizontal: 20,
						marginTop: 10,
						borderRadius: 10,
					}}
				>
					<Text style={{ color: 'white' }} bold>
						Register
					</Text>
				</TouchableOpacity>
}

{attendees.some(e => e.id === userR.id) == true &&  
<View>
			<View>
			<TouchableOpacity
					onPress={unregisterMe}
					style={{
						backgroundColor: Colors.primary,
						padding: 10,
						paddingHorizontal: 20,
						marginTop: 10,
						borderRadius: 10,
					}}
				>
					<Text style={{ color: 'white' }} bold>
						UnRegister
					</Text>
				</TouchableOpacity>

				</View>
			<View>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate('EventChatRoomScreen', { event_data: route.params.event_data });
					}}
					style={{
						backgroundColor: Colors.primary,
						padding: 10,
						paddingHorizontal: 20,
						marginTop: 10,
						borderRadius: 10,
					}}
				>
					<Text style={{ color: 'white' }} bold>
						chat room
					</Text>
				</TouchableOpacity>
			</View>
			</View>
}
			</View>
		</Layout>
	);
}

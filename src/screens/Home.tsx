import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView, RefreshControl, Keyboard, TextInput } from 'react-native';
import { MainStackParamList } from '../types/navigation';
import { StackScreenProps } from '@react-navigation/stack';
import { supabase } from '../initSupabase';
import Layout from '../components/global/Layout';
import Text from '../components/utils/StyledText';
import Colors from '../constants/Colors';
import { Dispatch } from "redux"

import { useSelector, shallowEqual, useDispatch } from "react-redux"

import { IUser, UserState, UserAction } from "../redux/type/user"
import { GlobalState } from "../redux/type/global"
import { EventState, IEvent } from '../redux/type/event';
import { getEvents } from '../redux/action';
import { event } from 'react-native-reanimated';

export default function ({
	navigation,
}: StackScreenProps<MainStackParamList, 'MainTabs'>) {
	const dispatch: Dispatch<any> = useDispatch()
	const [eventname, setEventName] = useState<string>('');

	const userR: IUser | undefined = useSelector(
		(state: GlobalState) => state.user.user
	)

	const eventR: IEvent[] = useSelector((state: GlobalState) => state.event.events)

	useEffect(() => {
		dispatch(getEvents())

   supabase
    .from('event')
    .on('INSERT', payload => {
		dispatch(getEvents())
    })
    .subscribe()
	}, []
	)

	function fetchEvents() {
		dispatch(getEvents())

	}

	function createEvent(){
		console.log(eventname)

		supabase
        .from('event')
        .insert([
          {name :eventname      }
        ]).then((data) => {
            console.log("send message")
            console.log(data)
			setEventName("")
			dispatch(getEvents())

        })
		setEventName("")
	}

	return (
		<Layout navigation={navigation} title="Home">
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{/* This text using ubuntu font */
					console.log("home screen" + JSON.stringify(eventR))
					//console.log(userR)
				}
				{userR?.firstname != undefined ?
					<Text bold>Hello {userR.firstname + " " + userR.lastname} </Text> : null
				}
					{userR?.firstname == undefined ?
					<Text bold>Hello {userR?.email} </Text> : null
				}
				<Text>This text using ubuntu font</Text>

				<Text>{"\n"}</Text>


				<View>
					{eventR.map(event => (
						<View key={event.id}> 
						<Text>{event.name} </Text>	
						<TouchableOpacity
							onPress={() => {
								navigation.navigate('SecondScreen', { event_data: event });
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
								details
						</Text>
						</TouchableOpacity>
						<Text>{"\n"}</Text>

						</View>
					))}
				</View>

<Text>{"\n"}{"\n"} </Text>
				<TouchableOpacity
					onPress={fetchEvents}
					style={{
						backgroundColor: Colors.primary,
						padding: 10,
						paddingHorizontal: 20,
						marginTop: 10,
						borderRadius: 10,
					}}
				>
					<Text style={{ color: 'white' }} bold>
						refresh
					</Text>
				</TouchableOpacity>





				<View style={styles.textInputContainer}>

<TextInput 								style={styles.textInput}
value={eventname}  onBlur={Keyboard.dismiss} onChangeText={(text) => setEventName(text)} />
</View>

<TouchableOpacity  style={{
			backgroundColor: '#00D03A',
			padding: 10,
			paddingHorizontal: 20,
			marginTop: 10,
			borderRadius: 10,
		}}	onPress={() => {
			createEvent();
		}}>
	<Text   style={{  color: 'white' }} bold> 						Create Event
</Text>
</TouchableOpacity>           




			

				<TouchableOpacity
					onPress={async () => {
						const { error } = await supabase.auth.signOut();
						if (!error) {
							alert('Signed out!');
						}
						if (error) {
							alert(error.message);
						}
					}}
					style={{
						backgroundColor: '#FF3A3A',
						padding: 10,
						paddingHorizontal: 20,
						marginTop: 10,
						borderRadius: 10,
					}}
				>
					<Text style={{ color: 'white' }} bold>
						Logout
					</Text>
				</TouchableOpacity>
			</View>


		</Layout>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollView: {
		flex: 1,
		backgroundColor: 'pink',
		alignItems: 'center',
		justifyContent: 'center',
	},
	textInput: {
		padding: 10,
		paddingHorizontal: 20,
		textAlign: 'left',
		color: 'black',
		flex: 1,
		fontFamily: 'Ubuntu_400Regular',
	},
	textInputContainer: {
		marginTop: 15,
		backgroundColor: '#FFF',
		borderColor: '#d8d8d8',
		borderWidth: 1,
		borderRadius: 8,
		flexDirection: 'row',
	},
});
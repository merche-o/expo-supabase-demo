import React, { useState, useEffect, Dispatch } from 'react';
import { Keyboard, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { MainStackParamList } from '../types/navigation';
import { StackScreenProps } from '@react-navigation/stack';

import Layout from '../components/global/Layout';
import Text from '../components/utils/StyledText';
import Colors from '../constants/Colors';

import { useSelector, shallowEqual, useDispatch } from "react-redux"

import {IUser, UserState, UserAction}  from "../redux/type/user"
import { GlobalState } from '../redux/type/global';
import { updateUser } from '../redux/action';

export default function ({
	navigation,
}: StackScreenProps<MainStackParamList, 'MainTabs'>) {
	const dispatch: Dispatch<any> = useDispatch()

	const userR: IUser | undefined = useSelector(
		 (state: GlobalState) => state.user.user,
		 shallowEqual
	 )
	 const [firstname, setFirtsname] = useState<string>('');
	 const [lastname, setLastname] = useState<string>('');
	 const [desc, setDesc] = useState<string>('');

	 useEffect(() => {
	setFirtsname(userR?.firstname ?? "")
	setLastname(userR?.lastname ?? "")
	setDesc(userR?.description ?? "")


	 }, [])

	 function onUpdateUser() {
	
		userR.description = desc
		userR.lastname = lastname
		userR.firstname = firstname
		console.log("UPDATE")
		console.log(userR)
		dispatch(updateUser(userR))

	 }
	return (
		<Layout navigation={navigation}>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{/* This text using ubuntu font */}
				<Text> {userR.email} </Text>

				<View style={styles.textInputContainer}>

<TextInput 								style={styles.textInput}
value={firstname}  onBlur={Keyboard.dismiss} onChangeText={(text) => setFirtsname(text)} />
</View>
				<View style={styles.textInputContainer}>

<TextInput 								style={styles.textInput}
value={lastname}  onBlur={Keyboard.dismiss} onChangeText={(text) => setLastname(text)} />
</View>
<View style={styles.textInputContainer}>

<TextInput 								style={styles.textInput}
value={desc}  onBlur={Keyboard.dismiss} onChangeText={(text) => setDesc(text)} />
</View>


<TouchableOpacity  style={{
			flexDirection: 'row',
			marginTop: 20,
		}}	onPress={() => {
			onUpdateUser()
	}}>
			<View style={styles.button}>
	<Text   style={{ fontSize: 16, color: 'white' }}> submit</Text>
	</View>
</TouchableOpacity>           
			
			</View>
		</Layout>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
	},
	textInputContainer: {
		marginTop: 15,
		backgroundColor: '#FFF',
		borderColor: '#d8d8d8',
		borderWidth: 1,
		borderRadius: 8,
		flexDirection: 'row',
	},
	textInput: {
		padding: 10,
		paddingHorizontal: 20,
		textAlign: 'left',
		color: 'black',
		flex: 1,
		fontFamily: 'Ubuntu_400Regular',
	},
	button: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 15,
		backgroundColor: Colors.primary,
		borderRadius: 8,
	},
});

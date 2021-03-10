import React, { useState } from 'react';
import { TouchableOpacity, View, TextInput, Keyboard, StyleSheet} from 'react-native';
import { MainStackParamList } from '../types/navigation';
import { StackScreenProps } from '@react-navigation/stack';
import { supabase } from '../initSupabase';

import Layout from '../components/global/Layout';
import { Text } from 'react-native-elements';

import { useEffect } from 'react';
import Colors from '../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalState } from '../redux/type/global';
import { IUser } from '../redux/type/user';
import { getAttendees, getEvents, getMessages } from '../redux/action';
import { Dispatch } from "redux"
import Message from '../components/message';
import { useRef } from 'react';
import { FlatList } from 'react-native-gesture-handler';

export default function ({
	navigation,
	route
}: StackScreenProps<MainStackParamList, 'EventChatRoomScreen'>) {
	const dispatch: Dispatch<any> = useDispatch()

	const [cmessage, setCmessage] = useState<string>('');

    const textInputRef = useRef<HTMLInputElement>(null)

	const userR: IUser | undefined = useSelector(
		(state: GlobalState) => state.user.user
	)

    const messages : IMessage[] = useSelector(
        (state:GlobalState) => state.messages.messages
    )

	const attendees: IUser[] = useSelector((state: GlobalState) => state.attendee.attendees)

  
      
      function sendCmessage(){
        supabase
        .from('messages')
        .insert([
          {event_id :route.params.event_data.id,
          user_id : userR?.id,
          content : cmessage}
        ]).then((data) => {
            console.log("send message")
            console.log(data)
            setCmessage("")

        })
      }

      function getUserName(data: IMessage) {
//console.log(attendees)
//console.log(userR.id)

        if (userR?.id === data.user_id) {
          //  console.log("ME")
            //console.log(userR)

            return userR?.firstname + " " + userR?.lastname
        } else {
     //      console.log("other")
       //    console.log(attendees)
           var result =  attendees.find((element) => {return element.id === data.user_id})
         //  console.log("result")
           //console.log(result)
           if (result?.firstname == undefined && result?.lastname == undefined) {
               return result?.email
           }else {
           return result?.firstname + " " + result?.lastname
            }
        }

        
      }
    
   

	useEffect(() => {
        console.log("use effect chatroom")
        console.log(attendees)
        dispatch(getMessages(route.params.event_data.id))

        supabase
    .from('messages')
    .on('INSERT', payload => {
        dispatch(getMessages(route.params.event_data.id))
    })
    .subscribe()
	
	}, [])
	


		return (
		<Layout navigation={navigation} title={route.params.event_data.name} withBack>
			<View
				style={{
						flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{/* This text using ubuntu font */}
                <View  style={{
							flex: 10,
							paddingHorizontal: 20,
							paddingBottom: 20,
							backgroundColor: '#fff',
						}}>
                <Text h3>Chat Room</Text>
                <FlatList data={messages}  renderItem={({item}) => <Text > {getUserName(item)}   :  {item.content}</Text>} />
               
                <View style={styles.textInputContainer}>

                    <TextInput 								style={styles.textInput}
  value={cmessage}  onBlur={Keyboard.dismiss} onChangeText={(text) => setCmessage(text)} />
  			</View>

                    <TouchableOpacity  style={{
								flexDirection: 'row',
								marginTop: 20,
							}}	onPress={() => {
								sendCmessage();
							}}>
                                <View style={styles.button}>
                        <Text   style={{ fontSize: 16, color: 'white' }}> submit</Text>
                        </View>
            </TouchableOpacity>           
            </View>
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

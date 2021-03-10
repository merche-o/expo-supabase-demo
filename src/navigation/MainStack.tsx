import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SecondScreen from '../screens/SecondScreen';
import MainTabs from './MainTabs';
import EventChatRoomScreen from '../screens/EventChatRoomScreen';

const MainStack = createStackNavigator();
const Main = () => {
	return (
		<MainStack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<MainStack.Screen name="MainTabs" component={MainTabs} />
			<MainStack.Screen name="SecondScreen" component={SecondScreen} />
			<MainStack.Screen name="EventChatRoomScreen" component={EventChatRoomScreen} />
		</MainStack.Navigator>
	);
};

export default Main;

import { IEvent } from "../redux/type/event";

export type MainStackParamList = {
	MainTabs: undefined;
	SecondScreen: {event_data : IEvent};
	EventChatRoomScreen:{event_data: IEvent}
};

export type AuthStackParamList = {
	Login: undefined;
	Register: undefined;
	ForgetPassword: undefined;
};

export type MainTabsParamList = {
	Home: undefined;
	Profile: undefined;
	About: undefined;
};

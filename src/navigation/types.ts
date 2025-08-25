import { NavigatorScreenParams } from '@react-navigation/native'

export type RootStackParamList = {
	Main: NavigatorScreenParams<TabStackParamList>
	Login: undefined
	Register: undefined
	RequestDetails: { requestId: string }
	Requests: undefined
	CreateRequest: undefined
}

export type TabStackParamList = {
	Home: undefined
	Profile: undefined
}

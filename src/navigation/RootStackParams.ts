import { StackNavigationProp } from '@react-navigation/stack'

export type RootStackParamList = {
	Main: undefined
	MyApplications: undefined
	Registration: undefined
	Login: undefined
}

export type NavigationProp = StackNavigationProp<RootStackParamList, 'Main'>

import { StackNavigationProp } from '@react-navigation/stack'

export type RootStackParamList = {
	MainTabs: undefined
	MyApplications: undefined
	Registration: undefined
	Login: undefined
}

export type NavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>

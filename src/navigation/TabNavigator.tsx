import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { COLORS } from '@/shared/config/theme'
import { Home, FileText, FilePlus, User } from 'lucide-react-native'
import HomeScreen from '@/screens/home/HomeScreen'
import ProfileScreen from '@/screens/profile/ProfileScreen'
import { TabStackParamList } from './types'
import RequestsScreen from '@/screens/requests/RequestScreen'
import CreateRequestScreen from '@/screens/requests/CreateRequestsScreen'

const Tab = createBottomTabNavigator<TabStackParamList>()

const TabNavigator = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarActiveTintColor: COLORS.primary,
				tabBarInactiveTintColor: COLORS.textSecondary,
				headerStyle: {
					backgroundColor: COLORS.primary,
				},
				headerTintColor: COLORS.white,
				headerTitleStyle: {
					fontWeight: 'bold',
				},
			}}
		>
			<Tab.Screen
				name='Home'
				component={HomeScreen}
				options={{
					title: 'Главная',
					tabBarIcon: ({ color }) => <Home size={24} color={color} />,
					tabBarLabel: 'Главная',
				}}
			/>

			<Tab.Screen
				name='Profile'
				component={ProfileScreen}
				options={{
					title: 'Профиль',
					tabBarIcon: ({ color }) => <User size={24} color={color} />,
					tabBarLabel: 'Профиль',
				}}
			/>
		</Tab.Navigator>
	)
}

export default TabNavigator

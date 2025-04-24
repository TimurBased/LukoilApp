import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-paper'
import HomeScreen from '../../screens/home/ui/HomeScreen'
import ProfileScreen from '../../screens/profile/ui/ProfileScreen'

const Tab = createBottomTabNavigator()

const TabNavigation: React.FC = () => {
	return (
		<Tab.Navigator
			initialRouteName='MainTab'
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color, size }) => {
					let iconName = 'help-circle-outline'

					switch (route.name) {
						case 'MainTab':
							iconName = 'home'
							break
						case 'ProfileTab':
							iconName = 'account'
							break
					}

					return <Icon source={iconName} size={size} color={color} />
				},
				tabBarActiveTintColor: 'red',
				tabBarInactiveTintColor: 'red',
			})}
		>
			<Tab.Screen name='MainTab' component={HomeScreen} />
			<Tab.Screen name='ProfileTab' component={ProfileScreen} />
		</Tab.Navigator>
	)
}

export default TabNavigation

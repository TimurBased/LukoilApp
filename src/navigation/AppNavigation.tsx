import React from 'react'
import TabNavigation from './MainNavigation/TabNavigation'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import MyApplicationsScreen from '../screens/myApplications/ui/MyApplicationsScreen'
import AuthNavigation from './AuthNavigation/AuthNavigation'
import { useAppSelector } from '../hooks/useApp'
import { ActivityIndicator } from 'react-native-paper'

const RootStack = createStackNavigator()

const AppNavigation: React.FC = () => {
	const { isAuth } = useAppSelector(state => state.auth)
	return (
		<NavigationContainer>
			<RootStack.Navigator>
				{isAuth ? (
					<>
						<RootStack.Screen
							name='Main'
							options={{ headerShown: false }}
							component={TabNavigation}
						/>
						<RootStack.Screen
							name='MyApplications'
							component={MyApplicationsScreen}
						/>
					</>
				) : (
					<RootStack.Screen name='Auth' component={AuthNavigation} />
				)}
			</RootStack.Navigator>
		</NavigationContainer>
	)
}

export default AppNavigation

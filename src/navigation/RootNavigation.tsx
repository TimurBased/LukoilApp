import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuthenticated } from '@/entities/user/model/selectors'
import { checkAuth } from '@/entities/user/model/slice'
import { COLORS } from '@/shared/config/theme'

import LoginScreen from '@/screens/auth/LoginScreen'
import RegisterScreen from '@/screens/auth/RegisterScreen'
import RequestDetailsScreen from '@/screens/requests/RequestDetailsScreen'
import { RootStackParamList } from './types'
import { AppDispatch } from '@/app/providers/store'
import TabNavigator from './TabNavigator'
import RequestsScreen from '@/screens/requests/RequestScreen'
import CreateRequestScreen from '@/screens/requests/CreateRequestsScreen'

const Stack = createNativeStackNavigator<RootStackParamList>()

const RootNavigator = () => {
	const dispatch = useDispatch<AppDispatch>()
	const isAuthenticated = useSelector(selectIsAuthenticated)

	useEffect(() => {
		dispatch(checkAuth())
	}, [dispatch])

	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerStyle: {
						backgroundColor: COLORS.primary,
					},
					headerTintColor: COLORS.white,
					headerTitleStyle: {
						fontWeight: 'bold',
					},
				}}
			>
				{isAuthenticated ? (
					<>
						<Stack.Screen
							name='Main'
							component={TabNavigator}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name='RequestDetails'
							component={RequestDetailsScreen}
							options={{ title: 'Детали заявки' }}
						/>

						<Stack.Screen
							name='Requests'
							component={RequestsScreen}
							options={{
								title: 'Мои заявки',
							}}
						/>

						<Stack.Screen
							name='CreateRequest'
							component={CreateRequestScreen}
							options={{
								title: 'Создать заявку',
							}}
						/>
					</>
				) : (
					<>
						<Stack.Screen
							name='Login'
							component={LoginScreen}
							options={{ title: 'Вход в систему' }}
						/>
						<Stack.Screen
							name='Register'
							component={RegisterScreen}
							options={{ title: 'Регистрация' }}
						/>
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default RootNavigator

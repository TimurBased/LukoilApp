import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import RegisterConnector from '../../features/auth/connector/RegisterConnector'
import LoginConnector from '../../features/auth/connector/LoginConnector'

const Stack = createNativeStackNavigator()
const AuthNavigation: React.FC = () => {
	return (
		<>
			<Stack.Navigator
				screenOptions={{ headerShown: false }}
				initialRouteName='Login'
			>
				<Stack.Screen
					name={'Registration'}
					component={RegisterConnector}
				></Stack.Screen>
				<Stack.Screen name={'Login'} component={LoginConnector}></Stack.Screen>
			</Stack.Navigator>
		</>
	)
}

export default AuthNavigation

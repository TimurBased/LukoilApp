import React from 'react'
import { View, StyleSheet } from 'react-native'
import RegisterConnector from '../../../features/auth/connector/RegisterConnector'
import LoginConnector from '../../../features/auth/connector/LoginConnector'

const AuthScreen: React.FC = () => {
	return (
		<View style={styles.container}>
			<RegisterConnector />
			<LoginConnector />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default AuthScreen

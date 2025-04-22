import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { MyApplicationsConnector } from '../../../features/application/connector/MyApplicationsConnector'

const MyApplicationsScreen: React.FC = () => {
	return (
		<View style={styles.container}>
			<MyApplicationsConnector />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
})

export default MyApplicationsScreen

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const ProfileScreen: React.FC = () => {
	return (
		<View style={styles.container}>
			<Text>Профиль</Text>
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

export default ProfileScreen

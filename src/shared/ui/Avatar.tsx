import React from 'react'
import { View, StyleSheet } from 'react-native'

const Avatar: React.FC = () => {
	return <View style={styles.avatar}></View>
}

const styles = StyleSheet.create({
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: '#ccc',
	},
})

export default Avatar

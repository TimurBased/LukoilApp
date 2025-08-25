import React from 'react'
import { StyleSheet, View } from 'react-native'
import { CreateRequestForm } from '@/features/request/create/ui/CreateRequestForm'

const CreateRequestScreen = () => {
	return (
		<View style={styles.container}>
			<CreateRequestForm />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})

export default CreateRequestScreen

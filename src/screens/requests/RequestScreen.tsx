import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/app/providers/store'
import { fetchRequests } from '@/entities/request/model/slice'
import { RequestList } from '@/features/request/list/ui/RequestList'

const RequestsScreen = () => {
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		dispatch(fetchRequests())
	}, [dispatch])

	return (
		<View style={styles.container}>
			<RequestList />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})

export default RequestsScreen

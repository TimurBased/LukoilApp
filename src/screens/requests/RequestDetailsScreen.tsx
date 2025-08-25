import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/app/providers/store'
import {
	fetchRequestById,
	clearCurrentRequest,
} from '@/entities/request/model/slice'
import { RequestDetails } from '@/features/request/details/ui/RequestDetails'
import { RootStackParamList } from '@/navigation/types'

type Props = NativeStackScreenProps<RootStackParamList, 'RequestDetails'>

const RequestDetailsScreen: React.FC<Props> = ({ route }) => {
	const { requestId } = route.params
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		dispatch(fetchRequestById(requestId))

		return () => {
			dispatch(clearCurrentRequest())
		}
	}, [dispatch, requestId])

	return (
		<View style={styles.container}>
			<RequestDetails />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})

export default RequestDetailsScreen

import React from 'react'
import {
	View,
	StyleSheet,
	FlatList,
	Text,
	ActivityIndicator,
} from 'react-native'
import { useSelector } from 'react-redux'
import {
	selectRequests,
	selectRequestLoading,
} from '@/entities/request/model/selectors'

import { RequestItem } from './RequestItem'
import { COLORS, SPACING } from '@/shared/config/theme'

export const RequestList = () => {
	const requests = useSelector(selectRequests)
	const loading = useSelector(selectRequestLoading)

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size='large' color={COLORS.primary} />
			</View>
		)
	}

	if (requests.length === 0) {
		return (
			<View style={styles.emptyContainer}>
				<Text style={styles.emptyText}>У вас пока нет заявок</Text>
			</View>
		)
	}

	return (
		<FlatList
			data={requests}
			keyExtractor={item => item.id}
			renderItem={({ item }) => <RequestItem request={item} />}
			contentContainerStyle={styles.listContainer}
		/>
	)
}

const styles = StyleSheet.create({
	listContainer: {
		padding: SPACING.md,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: SPACING.xl,
	},
	emptyText: {
		fontSize: 16,
		color: COLORS.textSecondary,
		textAlign: 'center',
	},
})

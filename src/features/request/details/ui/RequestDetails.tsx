import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import {
	selectCurrentRequest,
	selectRequestLoading,
} from '@/entities/request/model/selectors'

import { ActivityIndicator } from 'react-native'
import {
	BORDER_RADIUS,
	COLORS,
	FONT_SIZE,
	SPACING,
} from '@/shared/config/theme'
import { Card } from '@/shared/ui'
import { IRequests, States } from '@/entities/request'

export const RequestDetails = () => {
	const request = useSelector(selectCurrentRequest)
	const loading = useSelector(selectRequestLoading)

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size='large' color={COLORS.primary} />
			</View>
		)
	}

	if (!request) {
		return (
			<View style={styles.emptyContainer}>
				<Text style={styles.emptyText}>Заявка не найдена</Text>
			</View>
		)
	}

	const getStatusColor = (status: IRequests['state']['name']) => {
		switch (status) {
			case States.Completed:
				return COLORS.success
			case States.Rejected:
				return COLORS.error
			case States.InWork:
				return COLORS.blue
			case States.New:
			default:
				return COLORS.warning
		}
	}

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Card style={styles.headerCard}>
				<Text style={styles.title}>{request.title}</Text>
				<View
					style={[
						styles.statusBadge,
						{ backgroundColor: getStatusColor(request.state.name) },
					]}
				>
					<Text style={styles.statusText}>{request.state.name}</Text>
				</View>
			</Card>

			<Card style={styles.infoCard}>
				<View style={styles.infoRow}>
					<Text style={styles.infoLabel}>Дата создания:</Text>
					<Text style={styles.infoValue}>{request.created}</Text>
				</View>

				<View style={styles.infoRow}>
					<Text style={styles.infoLabel}>ID заявки:</Text>
					<Text style={styles.infoValue}>{request.id}</Text>
				</View>
			</Card>

			<Card style={styles.authorCard}>
				<Text style={styles.sectionTitle}>Автор заявки</Text>
				<View style={styles.infoRow}>
					<Text style={styles.infoLabel}>ФИО:</Text>
					<Text style={styles.infoValue}>
						{request.author.lastName} {request.author.firstName}{' '}
						{request.author.middleName}
					</Text>
				</View>
				<View style={styles.infoRow}>
					<Text style={styles.infoLabel}>Телефон:</Text>
					<Text style={styles.infoValue}>{request.author.phone}</Text>
				</View>
			</Card>

			<Text style={styles.sectionTitle}>Список предметов</Text>

			{request.items.map((item, index) => (
				<Card key={item.id} style={styles.itemCard}>
					<View style={styles.itemHeader}>
						<Text style={styles.itemNumber}>{index + 1}</Text>
						<Text style={styles.itemName}>
							{item.name || `Предмет ${item.id}`}
						</Text>
					</View>
					<View style={styles.itemDetails}>
						<Text style={styles.itemQuantityLabel}>Количество:</Text>
						<Text style={styles.itemQuantity}>{item.count}</Text>
					</View>
				</Card>
			))}

			<View style={styles.totalContainer}>
				<Text style={styles.totalLabel}>Всего предметов:</Text>
				<Text style={styles.totalValue}>
					{request.items.reduce((sum, item) => sum + item.count, 0)}
				</Text>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
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
	},
	emptyText: {
		fontSize: FONT_SIZE.lg,
		color: COLORS.textSecondary,
	},
	headerCard: {
		marginBottom: SPACING.md,
	},
	title: {
		fontSize: FONT_SIZE.xl,
		fontWeight: '600',
		color: COLORS.text,
		marginBottom: SPACING.sm,
	},
	statusBadge: {
		alignSelf: 'flex-start',
		paddingHorizontal: SPACING.md,
		paddingVertical: SPACING.xs,
		borderRadius: BORDER_RADIUS.sm,
	},
	statusText: {
		color: COLORS.white,
		fontSize: FONT_SIZE.sm,
		fontWeight: '500',
	},
	infoCard: {
		marginBottom: SPACING.md,
	},
	authorCard: {
		marginBottom: SPACING.lg,
	},
	infoRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: SPACING.sm,
	},
	infoLabel: {
		fontSize: FONT_SIZE.md,
		color: COLORS.textSecondary,
	},
	infoValue: {
		fontSize: FONT_SIZE.md,
		color: COLORS.text,
		fontWeight: '500',
		flex: 1,
		textAlign: 'right',
	},
	sectionTitle: {
		fontSize: FONT_SIZE.lg,
		fontWeight: '600',
		marginBottom: SPACING.md,
		marginTop: SPACING.md,
		color: COLORS.text,
	},
	itemCard: {
		marginBottom: SPACING.sm,
	},
	itemHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: SPACING.sm,
	},
	itemNumber: {
		width: 24,
		height: 24,
		borderRadius: 12,
		backgroundColor: COLORS.primary,
		color: COLORS.white,
		textAlign: 'center',
		lineHeight: 24,
		marginRight: SPACING.sm,
		fontSize: FONT_SIZE.sm,
		fontWeight: '500',
	},
	itemName: {
		fontSize: FONT_SIZE.md,
		fontWeight: '500',
		color: COLORS.text,
	},
	itemDetails: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 32,
	},
	itemQuantityLabel: {
		fontSize: FONT_SIZE.sm,
		color: COLORS.textSecondary,
	},
	itemQuantity: {
		fontSize: FONT_SIZE.sm,
		color: COLORS.text,
		fontWeight: '500',
	},
	totalContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: SPACING.md,
		marginBottom: SPACING.xl,
		paddingHorizontal: SPACING.md,
	},
	totalLabel: {
		fontSize: FONT_SIZE.lg,
		fontWeight: '600',
		color: COLORS.text,
	},
	totalValue: {
		fontSize: FONT_SIZE.lg,
		fontWeight: '600',
		color: COLORS.primary,
	},
})

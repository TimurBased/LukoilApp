import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { IRequests, States } from '@/entities/request/model/types'
import { RootStackParamList } from '@/navigation/types'
import {
	BORDER_RADIUS,
	COLORS,
	FONT_SIZE,
	SPACING,
} from '@/shared/config/theme'
import { Card } from '@/shared/ui'

interface RequestItemProps {
	request: IRequests
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

export const RequestItem: React.FC<RequestItemProps> = ({ request }) => {
	const navigation = useNavigation<NavigationProp>()

	const handlePress = () => {
		navigation.navigate('RequestDetails', { requestId: request.id })
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
		<TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
			<Card style={styles.card}>
				<View style={styles.header}>
					<Text style={styles.title} numberOfLines={1}>
						{request.title}
					</Text>
					<View
						style={[
							styles.statusBadge,
							{ backgroundColor: getStatusColor(request.state.name) },
						]}
					>
						<Text style={styles.statusText}>{request.state.name}</Text>
					</View>
				</View>

				<View style={styles.infoRow}>
					<Text style={styles.label}>Дата создания:</Text>
					<Text style={styles.value}>{request.created}</Text>
				</View>

				<Text style={styles.viewDetails}>Нажмите для просмотра деталей</Text>
			</Card>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	card: {
		marginBottom: SPACING.md,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: SPACING.sm,
	},
	title: {
		fontSize: FONT_SIZE.lg,
		fontWeight: '600',
		color: COLORS.text,
		flex: 1,
		marginRight: SPACING.sm,
	},
	statusBadge: {
		paddingHorizontal: SPACING.sm,
		paddingVertical: SPACING.xs,
		borderRadius: BORDER_RADIUS.sm,
	},
	statusText: {
		color: COLORS.white,
		fontSize: FONT_SIZE.xs,
		fontWeight: '500',
	},
	infoRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: SPACING.xs,
	},
	label: {
		fontSize: FONT_SIZE.sm,
		color: COLORS.textSecondary,
	},
	value: {
		fontSize: FONT_SIZE.sm,
		color: COLORS.text,
		fontWeight: '500',
	},
	viewDetails: {
		fontSize: FONT_SIZE.xs,
		color: COLORS.primary,
		textAlign: 'right',
		marginTop: SPACING.sm,
	},
})

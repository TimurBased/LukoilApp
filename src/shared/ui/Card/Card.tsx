import React from 'react'
import { View, StyleSheet, ViewProps, ViewStyle } from 'react-native'
import { COLORS, SPACING, BORDER_RADIUS } from '@/shared/config/theme'

interface CardProps extends ViewProps {
	children: React.ReactNode
	style?: ViewStyle
	elevation?: number
}

export const Card: React.FC<CardProps> = ({
	children,
	style,
	elevation = 2,
	...rest
}) => {
	return (
		<View
			style={[
				styles.card,
				{
					shadowOpacity: 0.1 + elevation * 0.05,
					shadowRadius: elevation,
					elevation: elevation,
				},
				style,
			]}
			{...rest}
		>
			{children}
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: COLORS.white,
		borderRadius: BORDER_RADIUS.md,
		padding: SPACING.md,
		shadowColor: COLORS.black,
		shadowOffset: { width: 0, height: 2 },
		marginVertical: SPACING.sm,
	},
})

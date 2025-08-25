import React from 'react'
import {
	TouchableOpacity,
	Text,
	StyleSheet,
	ActivityIndicator,
	ViewStyle,
	TextStyle,
	TouchableOpacityProps,
	View,
} from 'react-native'
import {
	COLORS,
	SPACING,
	FONT_SIZE,
	BORDER_RADIUS,
	FONT_WEIGHT,
} from '@/shared/config/theme'
import { FileText } from 'lucide-react-native'

interface ButtonProps extends TouchableOpacityProps {
	title: string
	variant?: 'primary' | 'secondary' | 'outline' | 'text'
	size?: 'small' | 'medium' | 'large'
	loading?: boolean
	disabled?: boolean
	style?: ViewStyle
	textStyle?: TextStyle
}

export const Button: React.FC<ButtonProps> = ({
	title,
	variant = 'primary',
	size = 'medium',
	loading = false,
	disabled = false,
	style,
	textStyle,
	...rest
}) => {
	const getButtonStyles = (): ViewStyle => {
		const baseStyle: ViewStyle = {
			...styles.button,
			...styles[`${size}Button`],
		}

		if (disabled) {
			return {
				...baseStyle,
				...styles.disabledButton,
			}
		}

		switch (variant) {
			case 'secondary':
				return {
					...baseStyle,
					...styles.secondaryButton,
				}
			case 'outline':
				return {
					...baseStyle,
					...styles.outlineButton,
				}
			case 'text':
				return {
					...baseStyle,
					...styles.textButton,
				}
			case 'primary':
			default:
				return {
					...baseStyle,
					...styles.primaryButton,
				}
		}
	}

	const getTextStyles = (): TextStyle => {
		const baseStyle: TextStyle = {
			...styles.text,
			...styles[`${size}Text`],
		}

		if (disabled) {
			return {
				...baseStyle,
				...styles.disabledText,
			}
		}

		switch (variant) {
			case 'secondary':
				return {
					...baseStyle,
					...styles.secondaryText,
				}
			case 'outline':
				return {
					...baseStyle,
					...styles.outlineText,
				}
			case 'text':
				return {
					...baseStyle,
					...styles.textButtonText,
				}
			case 'primary':
			default:
				return {
					...baseStyle,
					...styles.primaryText,
				}
		}
	}

	return (
		<TouchableOpacity
			style={[getButtonStyles(), style]}
			disabled={disabled || loading}
			activeOpacity={0.7}
			{...rest}
		>
			{loading ? (
				<ActivityIndicator
					size='small'
					color={variant === 'primary' ? COLORS.white : COLORS.primary}
				/>
			) : (
				<Text style={[getTextStyles(), textStyle]}>{title}</Text>
			)}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: BORDER_RADIUS.md,
	},
	smallButton: {
		paddingVertical: SPACING.xs,
		paddingHorizontal: SPACING.md,
		minHeight: 32,
	},
	mediumButton: {
		paddingVertical: SPACING.sm,
		paddingHorizontal: SPACING.lg,
		minHeight: 44,
	},
	largeButton: {
		paddingVertical: SPACING.md,
		paddingHorizontal: SPACING.xl,
		minHeight: 56,
	},
	primaryButton: {
		backgroundColor: COLORS.primary,
	},
	secondaryButton: {
		backgroundColor: COLORS.primaryLight,
	},
	outlineButton: {
		backgroundColor: COLORS.transparent,
		borderWidth: 1,
		borderColor: COLORS.primary,
	},
	textButton: {
		backgroundColor: COLORS.transparent,
		paddingHorizontal: SPACING.xs,
		paddingVertical: SPACING.xs,
		minHeight: undefined,
	},
	disabledButton: {
		backgroundColor: COLORS.disabled,
		borderColor: COLORS.disabled,
	},
	text: {
		fontWeight: FONT_WEIGHT.medium,
	},
	smallText: {
		fontSize: FONT_SIZE.xs,
	},
	mediumText: {
		fontSize: FONT_SIZE.md,
	},
	largeText: {
		fontSize: FONT_SIZE.lg,
	},
	primaryText: {
		color: COLORS.white,
	},
	secondaryText: {
		color: COLORS.primary,
	},
	outlineText: {
		color: COLORS.primary,
	},
	textButtonText: {
		color: COLORS.primary,
	},
	disabledText: {
		color: COLORS.textSecondary,
	},
})

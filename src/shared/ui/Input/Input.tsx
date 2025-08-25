import React, { useState } from 'react'
import {
	View,
	TextInput,
	Text,
	StyleSheet,
	TextInputProps,
	ViewStyle,
	TextStyle,
	TouchableOpacity,
} from 'react-native'
import {
	COLORS,
	SPACING,
	FONT_SIZE,
	BORDER_RADIUS,
	FONT_WEIGHT,
} from '@/shared/config/theme'
import { Eye, EyeOff } from 'lucide-react-native'

interface InputProps extends TextInputProps {
	label?: string
	error?: string
	containerStyle?: ViewStyle
	labelStyle?: TextStyle
	inputStyle?: TextStyle
	errorStyle?: TextStyle
	isPassword?: boolean
}

export const Input: React.FC<InputProps> = ({
	label,
	error,
	containerStyle,
	labelStyle,
	inputStyle,
	errorStyle,
	isPassword = false,
	...rest
}) => {
	const [secureTextEntry, setSecureTextEntry] = useState(isPassword)

	const toggleSecureEntry = () => {
		setSecureTextEntry(!secureTextEntry)
	}

	return (
		<View style={[styles.container, containerStyle]}>
			{label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
			<View
				style={[
					styles.inputContainer,
					error ? styles.inputError : null,
					rest.editable === false ? styles.inputDisabled : null,
				]}
			>
				<TextInput
					style={[styles.input, inputStyle]}
					placeholderTextColor={COLORS.textSecondary}
					secureTextEntry={secureTextEntry}
					{...rest}
				/>
				{isPassword && (
					<TouchableOpacity onPress={toggleSecureEntry} style={styles.eyeIcon}>
						{secureTextEntry ? (
							<EyeOff size={20} color={COLORS.textSecondary} />
						) : (
							<Eye size={20} color={COLORS.textSecondary} />
						)}
					</TouchableOpacity>
				)}
			</View>
			{error && <Text style={[styles.errorText, errorStyle]}>{error}</Text>}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginBottom: SPACING.md,
		width: '100%',
	},
	label: {
		fontSize: FONT_SIZE.sm,
		color: COLORS.text,
		marginBottom: SPACING.xs,
		fontWeight: FONT_WEIGHT.medium,
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: COLORS.divider,
		borderRadius: BORDER_RADIUS.md,
		backgroundColor: COLORS.white,
	},
	input: {
		flex: 1,
		paddingHorizontal: SPACING.md,
		paddingVertical: SPACING.sm,
		fontSize: FONT_SIZE.md,
		color: COLORS.text,
		minHeight: 48,
	},
	inputError: {
		borderColor: COLORS.error,
	},
	inputDisabled: {
		backgroundColor: COLORS.disabled,
		borderColor: COLORS.divider,
	},
	errorText: {
		fontSize: FONT_SIZE.xs,
		color: COLORS.error,
		marginTop: SPACING.xs,
	},
	eyeIcon: {
		padding: SPACING.sm,
	},
})

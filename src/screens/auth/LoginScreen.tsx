import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { LoginForm } from '@/features/auth/login/ui/LoginForm'
import { RootStackParamList } from '@/navigation/types'
import { COLORS, FONT_SIZE, SPACING } from '@/shared/config/theme'

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>

const LoginScreen: React.FC<Props> = () => {
	return (
		<View style={styles.container}>
			<View style={styles.logoContainer}>
				<View style={styles.logoCircle}>
					<Image
						style={styles.logoStyles}
						source={require('@/../assets/logo.png')}
					/>
				</View>
				<Text style={styles.appName}>Менеджер заявок</Text>
			</View>

			<View style={styles.formContainer}>
				<LoginForm />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: SPACING.lg,
	},
	logoContainer: {
		alignItems: 'center',
		marginTop: SPACING.xl,
		marginBottom: SPACING.xl,
	},
	logoCircle: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: COLORS.primary,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: SPACING.md,
	},
	logoStyles: {
		width: 75,
		height: 75,
	},
	appName: {
		fontSize: FONT_SIZE.xl,
		fontWeight: 'bold',
		color: COLORS.text,
	},
	formContainer: {
		flex: 1,
		justifyContent: 'flex-start',
	},
})

export default LoginScreen

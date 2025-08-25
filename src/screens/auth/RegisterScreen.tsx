import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RegisterForm } from '@/features/auth/register/ui/RegisterForm'
import { RootStackParamList } from '@/navigation/types'
import { COLORS, FONT_SIZE, SPACING } from '@/shared/config/theme'

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>

const RegisterScreen: React.FC<Props> = () => {
	return (
		<View style={styles.container}>
			<View style={styles.formContainer}>
				<RegisterForm />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	formContainer: {
		flex: 1,
	},
})

export default RegisterScreen

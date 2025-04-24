import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { TextInput, Button, Snackbar } from 'react-native-paper'
import { useFormik } from 'formik'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp } from '../../../navigation/RootStackParams'

interface FormValues {
	login: string
	password: string
}

interface Props {
	submit: (values: FormValues) => Promise<Partial<FormValues> | null>
	error: string | null
}

const LoginView: React.FC<Props> = ({ submit, error }) => {
	const [snackbarVisible, setSnackbarVisible] = useState(false)

	useEffect(() => {
		if (error) {
			setSnackbarVisible(true)
		}
	}, [error])

	const navigation = useNavigation<NavigationProp>()
	const formik = useFormik<FormValues>({
		initialValues: {
			login: '',
			password: '',
		},
		onSubmit: async (values, { setErrors, setSubmitting }) => {
			const errors = await submit(values)
			if (errors) {
				setErrors(errors)
			}
			setSubmitting(false)
		},
	})

	return (
		<View style={styles.container}>
			<View style={styles.form}>
				<TextInput
					label='Login'
					value={formik.values.login}
					onChangeText={formik.handleChange('login')}
					onBlur={formik.handleBlur('login')}
					style={styles.input}
					error={!!formik.errors.login}
				/>
				<TextInput
					label='Password'
					value={formik.values.password}
					onChangeText={formik.handleChange('password')}
					onBlur={formik.handleBlur('password')}
					secureTextEntry
					style={styles.input}
					error={!!formik.errors.password}
				/>
				<Button
					mode='contained'
					onPress={formik.handleSubmit as () => void}
					loading={formik.isSubmitting}
					disabled={formik.isSubmitting}
					style={styles.button}
				>
					Войти
				</Button>
				<Button
					mode='outlined'
					style={styles.button}
					onPress={() => {
						navigation.replace('Registration')
					}}
				>
					Зарегистрироваться
				</Button>
			</View>

			<Snackbar
				visible={snackbarVisible}
				onDismiss={() => setSnackbarVisible(false)}
				duration={3000}
				action={{
					label: 'Закрыть',
					onPress: () => setSnackbarVisible(false),
				}}
			>
				{error}
			</Snackbar>
		</View>
	)
}

export default LoginView

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 20,
	},
	form: {
		width: '100%',
		maxWidth: 400,
	},
	input: {
		marginBottom: 12,
		width: '100%',
	},
	button: {
		marginTop: 16,
	},
})

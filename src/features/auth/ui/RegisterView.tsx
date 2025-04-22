import React from 'react'
import { useFormik } from 'formik'
import { View, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp } from '../../../navigation/RootStackParams'

interface FormValues {
	firstName: string
	middleName: string
	lastName: string
	phone: string
	login: string
	password: string
}

interface Props {
	submit: (values: FormValues) => Promise<Partial<FormValues> | null>
}

const RegisterView: React.FC<Props> = ({ submit }) => {
	const navigation = useNavigation<NavigationProp>()
	const formik = useFormik<FormValues>({
		initialValues: {
			firstName: '',
			middleName: '',
			lastName: '',
			phone: '',
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
					label='First Name'
					value={formik.values.firstName}
					onChangeText={formik.handleChange('firstName')}
					style={styles.input}
				/>
				<TextInput
					label='Middle Name'
					value={formik.values.middleName}
					onChangeText={formik.handleChange('middleName')}
					style={styles.input}
				/>
				<TextInput
					label='Last Name'
					value={formik.values.lastName}
					onChangeText={formik.handleChange('lastName')}
					style={styles.input}
				/>
				<TextInput
					label='Phone'
					keyboardType='phone-pad'
					value={formik.values.phone}
					onChangeText={formik.handleChange('phone')}
					style={styles.input}
				/>
				<TextInput
					label='Login'
					value={formik.values.login}
					onChangeText={formik.handleChange('login')}
					style={styles.input}
				/>
				<TextInput
					label='Password'
					value={formik.values.password}
					onChangeText={formik.handleChange('password')}
					secureTextEntry
					style={styles.input}
				/>
				<Button
					mode='contained'
					onPress={formik.handleSubmit as () => void}
					loading={formik.isSubmitting}
					disabled={formik.isSubmitting}
					style={styles.button}
				>
					Зарегистрироваться
				</Button>

				<Button
					mode='outlined'
					style={styles.button}
					onPress={() => {
						navigation.replace('Login')
					}}
				>
					Уже есть аккаунт
				</Button>
			</View>
			<></>
		</View>
	)
}
export default RegisterView
const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		padding: 20,
	},
	form: {
		flex: 1,
		alignItems: 'center',
	},
	input: {
		marginBottom: 12,
		width: 200,
		height: 50,
		maxWidth: 400,
		maxHeight: 50,
	},
	button: {
		marginTop: 20,
	},
})

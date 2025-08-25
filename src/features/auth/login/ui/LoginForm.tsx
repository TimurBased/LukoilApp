import React from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { login } from '@/entities/user/model/slice'
import {
	selectUserLoading,
	selectUserError,
} from '@/entities/user/model/selectors'

import { AppDispatch } from '@/app/providers/store'
import { Input } from '@/shared/ui/Input/Input'
import { Button } from '@/shared/ui/Button/Button'
import { SPACING } from '@/shared/config/theme'
import { RootStackParamList } from '@/navigation/types'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>

const LoginSchema = Yup.object().shape({
	login: Yup.string()
		.min(4, 'Логин должен содержать минимум 4 символа')
		.required('Логин обязателен'),
	password: Yup.string()
		.min(6, 'Пароль должен содержать минимум 6 символов')
		.required('Пароль обязателен'),
})

export const LoginForm = () => {
	const dispatch = useDispatch<AppDispatch>()
	const navigation = useNavigation<NavigationProp>()
	const loading = useSelector(selectUserLoading)
	const error = useSelector(selectUserError)

	const handleLogin = async (values: { login: string; password: string }) => {
		try {
			await dispatch(login(values)).unwrap()
		} catch (error) {
			Alert.alert('Ошибка', error as string)
		}
	}

	return (
		<Formik
			initialValues={{ login: '', password: '' }}
			validationSchema={LoginSchema}
			onSubmit={handleLogin}
		>
			{({
				handleChange,
				handleBlur,
				handleSubmit,
				values,
				errors,
				touched,
			}) => (
				<View style={styles.container}>
					<Input
						label='Логин'
						value={values.login}
						onChangeText={handleChange('login')}
						onBlur={handleBlur('login')}
						placeholder='Введите логин'
						autoCapitalize='none'
						error={touched.login && errors.login ? errors.login : ''}
					/>

					<Input
						label='Пароль'
						value={values.password}
						onChangeText={handleChange('password')}
						onBlur={handleBlur('password')}
						placeholder='Введите пароль'
						isPassword
						error={touched.password && errors.password ? errors.password : ''}
					/>

					<Button
						title='Войти'
						onPress={() => {
							handleSubmit()
						}}
						loading={loading}
						style={styles.button}
					/>

					<Button
						title='Регистрация'
						variant='outline'
						onPress={() => navigation.replace('Register')}
						style={styles.button}
					/>
				</View>
			)}
		</Formik>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
	button: {
		marginTop: SPACING.md,
	},
})

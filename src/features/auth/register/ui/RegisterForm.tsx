import React from 'react'
import { View, StyleSheet, ScrollView, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { register } from '@/entities/user/model/slice'
import { selectUserLoading } from '@/entities/user/model/selectors'

import { AppDispatch } from '@/app/providers/store'
import { Button, Input } from '@/shared/ui'
import { SPACING } from '@/shared/config/theme'
import { RootStackParamList } from '@/navigation/types'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>

const RegisterSchema = Yup.object().shape({
	lastName: Yup.string()
		.min(2, 'Фамилия должна содержать минимум 2 символа')
		.required('Фамилия обязательна'),
	firstName: Yup.string()
		.min(2, 'Имя должно содержать минимум 2 символа')
		.required('Имя обязательно'),
	middleName: Yup.string().required('Отчество обязательно'),
	login: Yup.string()
		.min(4, 'Логин должен содержать минимум 4 символа')
		.required('Логин обязателен'),
	password: Yup.string()
		.min(6, 'Пароль должен содержать минимум 6 символов')
		.required('Пароль обязателен'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password')], 'Пароли не совпадают')
		.required('Подтверждение пароля обязательно'),
	phone: Yup.string()
		.matches(/^\+?[0-9]{10,15}$/, 'Введите корректный номер телефона')
		.required('Номер телефона обязателен'),
})

export const RegisterForm = () => {
	const dispatch = useDispatch<AppDispatch>()
	const navigation = useNavigation<NavigationProp>()
	const loading = useSelector(selectUserLoading)

	const handleRegister = async (values: any) => {
		try {
			const userData = {
				lastName: values.lastName,
				firstName: values.firstName,
				middleName: values.middleName,
				login: values.login,
				password: values.password,
				phone: values.phone,
			}

			await dispatch(register(userData)).unwrap()
			navigation.navigate('Main', { screen: 'Home' })
			Alert.alert('Успех', 'Регистрация прошла успешно')
		} catch (error) {
			Alert.alert('Ошибка', error as string)
		}
	}

	return (
		<ScrollView contentContainerStyle={styles.scrollContainer}>
			<Formik
				initialValues={{
					lastName: '',
					firstName: '',
					middleName: '',
					login: '',
					password: '',
					confirmPassword: '',
					phone: '',
				}}
				validationSchema={RegisterSchema}
				onSubmit={handleRegister}
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
							label='Фамилия'
							value={values.lastName}
							onChangeText={handleChange('lastName')}
							onBlur={handleBlur('lastName')}
							placeholder='Введите фамилию'
							error={touched.lastName && errors.lastName ? errors.lastName : ''}
						/>

						<Input
							label='Имя'
							value={values.firstName}
							onChangeText={handleChange('firstName')}
							onBlur={handleBlur('firstName')}
							placeholder='Введите имя'
							error={
								touched.firstName && errors.firstName ? errors.firstName : ''
							}
						/>

						<Input
							label='Отчество'
							value={values.middleName}
							onChangeText={handleChange('middleName')}
							onBlur={handleBlur('middleName')}
							placeholder='Введите отчество'
							error={
								touched.middleName && errors.middleName ? errors.middleName : ''
							}
						/>

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

						<Input
							label='Подтверждение пароля'
							value={values.confirmPassword}
							onChangeText={handleChange('confirmPassword')}
							onBlur={handleBlur('confirmPassword')}
							placeholder='Повторите пароль'
							isPassword
							error={
								touched.confirmPassword && errors.confirmPassword
									? errors.confirmPassword
									: ''
							}
						/>

						<Input
							label='Номер телефона'
							value={values.phone}
							onChangeText={handleChange('phone')}
							onBlur={handleBlur('phone')}
							placeholder='+7XXXXXXXXXX'
							keyboardType='phone-pad'
							error={touched.phone && errors.phone ? errors.phone : ''}
						/>

						<Button
							title='Зарегистрироваться'
							onPress={() => {
								handleSubmit()
							}}
							loading={loading}
							style={styles.button}
						/>

						<Button
							title='Уже есть аккаунт? Войти'
							variant='text'
							onPress={() => navigation.replace('Login')}
							style={styles.button}
						/>
					</View>
				)}
			</Formik>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	scrollContainer: {
		flexGrow: 1,
	},
	container: {
		width: '100%',
		padding: SPACING.md,
	},
	button: {
		marginTop: SPACING.md,
	},
})

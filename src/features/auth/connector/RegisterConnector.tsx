import React, { useCallback, useEffect } from 'react'
import RegisterView from '@/features/auth/ui/RegisterView'
import { useAppSelector, useAppDispatch } from '@/hooks/useApp'
import { register } from '@/features/auth/model/authThunks'
import { IUser } from '@/entities/IUser'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp } from '@/navigation/RootStackParams'
const RegisterConnector: React.FC = () => {
	const { isAuth } = useAppSelector(state => state.auth)
	const dispatch = useAppDispatch()
	const navigate = useNavigation<NavigationProp>()
	const handleSubmit = useCallback(
		async (values: IUser) => {
			console.log(values)
			await dispatch(register(values))
			return null
		},
		[dispatch]
	)
	useEffect(() => {
		if (isAuth) navigate.replace('Login')
	}, [isAuth, navigate])
	return <RegisterView submit={handleSubmit} />
}

export default RegisterConnector

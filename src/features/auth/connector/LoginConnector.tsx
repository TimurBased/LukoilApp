import React, { useCallback, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/hooks/useApp'
import { login } from '@/features/auth/model/authThunks'
import LoginView from '@/features/auth/ui/LoginView'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp } from '@/navigation/RootStackParams'

const LoginConnector: React.FC = () => {
	const { isAuth, error } = useAppSelector(state => state.auth)

	const dispatch = useAppDispatch()
	const navigate = useNavigation<NavigationProp>()
	const handleSubmit = useCallback(
		async (values: any) => {
			await dispatch(login(values))

			return null
		},
		[dispatch]
	)
	useEffect(() => {
		if (isAuth) navigate.navigate('Main')
	}, [isAuth, navigate])

	return <LoginView error={error} submit={handleSubmit} />
}

export default LoginConnector

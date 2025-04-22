import React, { useCallback, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../../hooks/useApp'
import { login } from '../model/thunks'
import LoginView from '../ui/LoginView'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp } from '../../../navigation/RootStackParams'

const LoginConnector: React.FC = () => {
	const { isAuth } = useAppSelector(state => state.auth)
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
		if (isAuth) navigate.navigate('MainTabs')
	}, [isAuth, navigate])

	return <LoginView submit={handleSubmit} />
}

export default LoginConnector

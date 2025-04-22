import React, { useCallback } from 'react'
import RegisterView from '../ui/RegisterView'
import { useAppSelector, useAppDispatch } from '../../../hooks/useApp'
import { register } from '../model/thunks'
import { IUser } from '../../../entities/IUser'

const RegisterConnector: React.FC = () => {
	const {} = useAppSelector(state => state.auth)
	const dispatch = useAppDispatch()

	const handleSubmit = useCallback(
		async (values: IUser) => {
			console.log(values)
			await dispatch(register(values))
			return null
		},
		[dispatch]
	)

	return <RegisterView submit={handleSubmit} />
}

export default RegisterConnector

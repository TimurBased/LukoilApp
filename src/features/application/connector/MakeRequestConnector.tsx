import React, { useCallback } from 'react'
import MakeApplicationView from '../ui/MakeRequestView'
import { useAppDispatch, useAppSelector } from '../../../hooks/useApp'
import { makeRequest } from '../model/thunks'
import { IMakeApplicationRequest } from '../types/IMakeApplicationRequest'

interface Props {
	onSuccess: () => void
}

export const MakeRequestConnector: React.FC<Props> = ({ onSuccess }) => {
	const dispatch = useAppDispatch()

	const { error, isLoading } = useAppSelector(state => state.request)

	const handleSubmit = useCallback(
		async (values: IMakeApplicationRequest) => {
			const action = await dispatch(makeRequest(values))

			if (makeRequest.fulfilled.match(action)) {
				onSuccess()
			}

			return null
		},
		[dispatch, onSuccess]
	)

	return (
		<MakeApplicationView
			error={error}
			isLoading={isLoading}
			submit={handleSubmit}
		/>
	)
}

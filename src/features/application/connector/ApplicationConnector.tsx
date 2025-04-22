import React, { useCallback } from 'react'
import { ApplicationView } from '../ui/ApplicationView'
import { fetchData } from '../../../shared/api/axios'

interface Props {
	onSuccess: () => void
}

export const ApplicationConnector: React.FC<Props> = ({ onSuccess }) => {
	const handleSubmit = useCallback(
		async (values: any) => {
			onSuccess()
			return null
		},
		[onSuccess]
	)

	return <ApplicationView submit={handleSubmit} />
}

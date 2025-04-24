import React, { useCallback, useEffect, useState } from 'react'
import UserRequestsView from '../ui/UserRequestsView'
import { fetchData } from '../../../shared/api/axios'
import { ProgressBar, MD3Colors, Text } from 'react-native-paper'
import { IRequest } from '../../../entities/IRequest'

export const UserRequestsConnector: React.FC = () => {
	const [data, setData] = useState<IRequest[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	const getData = async () => {
		try {
			const response = await fetchData()
			setData(response)
		} catch (err) {
			setError('Ошибка при загрузке данных')
			console.error(err)
		} finally {
			setLoading(false)
		}
	}
	useEffect(() => {
		getData()
	}, [])

	return (
		<>
			{loading && <ProgressBar progress={0.9} color={MD3Colors.error50} />}
			{error && (
				<Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
			)}
			{!loading && !error && <UserRequestsView data={data} />}
		</>
	)
}

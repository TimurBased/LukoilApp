import React, { useCallback, useEffect, useState } from 'react'
import MyApplicationsView from '../ui/MyApplicationsView'
import { fetchData } from '../../../shared/api/axios'
import { ProgressBar, MD3Colors, Text } from 'react-native-paper'

interface RequestProps {
	id: string
	name: string
	author: string
	created: string
}

export const MyApplicationsConnector: React.FC = () => {
	const [data, setData] = useState<RequestProps[]>([])
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
			{!loading && !error && <MyApplicationsView data={data} />}
		</>
	)
}

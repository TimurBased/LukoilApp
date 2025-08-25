import axios from 'axios'
import { IAuthResponse } from '@/entities/user/model/types'
import { storage } from '../lib/storage/storage'

export const $api = axios.create({
	baseURL: 'http://192.168.0.56:8181',
	headers: {
		'Accept-Language': 'es-ES,es;q=0.8',
		'Content-Type': 'application/json',
	},
})

$api.interceptors.request.use(async config => {
	const token = await storage.getItem('accessToken')

	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}

	return config
})

$api.interceptors.response.use(
	config => {
		return config
	},
	async error => {
		const originalRequest = error.config
		if (
			error.response?.status === 401 &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				const response = await $api.get<IAuthResponse>('/auth/refresh', {
					withCredentials: true,
				})
				await storage.setItem('accessToken', response.data.accessToken)
				return $api.request(originalRequest)
			} catch (e) {
				console.log('Не авторизован')
				// Clear tokens on refresh failure
				await storage.removeItem('accessToken')
			}
		}
		throw error
	}
)

import { storage } from '@/shared/lib/storage/storage'
import { $api } from '../axios'
import {
	IAuthResponse,
	IUser,
	LoginCredentials,
	RegisterData,
} from '@/entities/user/model/types'

export const authService = {
	async login(credentials: LoginCredentials): Promise<IAuthResponse> {
		const response = await $api.post<IAuthResponse>('/auth/login', credentials)

		if (response.data.accessToken) {
			await storage.setItem('accessToken', response.data.accessToken)
		}

		if (response.data.refreshToken) {
			await storage.setItem('refreshToken', response.data.refreshToken)
		}

		return response.data
	},

	async register(userData: RegisterData): Promise<IAuthResponse> {
		const response = await $api.post<IAuthResponse>('/auth/register', userData)
		// if (response.data.accessToken) {
		// 	await storage.setItem('accessToken', response.data.accessToken)
		// }

		// if (response.data.refreshToken) {
		// 	await storage.setItem('refreshToken', response.data.refreshToken)
		// }

		return response.data
	},

	async logout(): Promise<void> {
		await storage.removeItem('refreshToken')
		await storage.removeItem('accessToken')
	},

	async checkAuth(): Promise<IAuthResponse> {
		const refreshToken = await storage.getItem('refreshToken')
		if (!refreshToken) {
			throw new Error('Не авторизован')
		}
		const response = await $api.post<IAuthResponse>('/auth/refresh', {
			refreshToken: refreshToken,
		})

		if (response.data.accessToken) {
			await storage.setItem('accessToken', response.data.accessToken)
		}

		return response.data
	},

	async getCurrentUser() {
		const response = await $api.get<IUser>('/user')
		return response.data
	},
}

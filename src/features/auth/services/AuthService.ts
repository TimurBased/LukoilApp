import { $api } from '../../../shared/api/axios'
import { IAuthResponse } from '../types/AuthResponse'
import { IUser } from '../../../entities/IUser'

class AuthService {
	static async login(data: IUser) {
		return await $api.post<IAuthResponse, any, any>('/auth/login', {
			login: data.login,
			password: data.password,
		})
	}

	public static async registration(data: IUser) {
		return await $api.post<IAuthResponse, any, IUser>('/auth/register', {
			firstName: data.firstName,
			middleName: data.middleName,
			lastName: data.lastName,
			phone: data.phone,
			login: data.login,
			password: data.password,
		})
	}

	static async logout() {
		return await $api.post('/auth/logout')
	}

	static async refresh(refreshToken: string) {
		const response = await $api.post<IAuthResponse>('/auth/refresh', {
			refreshToken: refreshToken,
		})
		return response
	}
}

export default AuthService

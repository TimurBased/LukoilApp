import { $api } from '../../../shared/api/axios'
import { AuthResponse } from '../types/AuthResponse'
import { IUser } from '../../../entities/IUser'

class AuthService {
	async login(data: IUser) {
		return await $api.post<AuthResponse, any, any>('/auth/login', {
			login: data.login,
			password: data.password,
		})
	}

	async registration(data: IUser) {
		return await $api.post<AuthResponse, any, IUser>('/auth/register', {
			firstName: data.firstName,
			middleName: data.middleName,
			lastName: data.lastName,
			phone: data.phone,
			login: data.login,
			password: data.password,
		})
	}

	async logout(): Promise<void> {
		return await $api.post('/auth/logout')
	}
}

export default new AuthService()

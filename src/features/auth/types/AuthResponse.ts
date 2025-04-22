import { IUser } from '../../../entities/IUser'

export interface AuthResponse {
	refreshToken: string
	accessToken: string
}

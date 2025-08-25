export interface IUser {
	id?: string
	firstName: string
	middleName: string
	lastName: string
	phone: string
	login: string
	password?: string
}

export interface IAuthor {
	firstName: string
	middleName: string
	lastName: string
	phone: string
}

export interface IAuthResponse {
	accessToken: string
	refreshToken: string
}

export interface UserState {
	currentUser: IUser | null
	isAuthenticated: boolean
	loading: boolean
	error: string | null
}

export interface LoginCredentials {
	login: string
	password: string
}

export interface RegisterData {
	firstName: string
	lastName: string
	middleName: string
	login: string
	password: string
	phone: string
}

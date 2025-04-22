import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthService from '../services/AuthService'
import { IUser } from '../../../entities/IUser'
import { AuthResponse } from '../types/AuthResponse'
import { AxiosResponse } from 'axios'

export const login = createAsyncThunk(
	'auth/login',
	async (data: IUser, { rejectWithValue }) => {
		try {
			const response:AxiosResponse<AuthResponse> = await AuthService.login(data)
			return response.data
		} catch (error: any) {
			return rejectWithValue(error.response.data)
		}
	}
)

export const register = createAsyncThunk(
	'auth/register',
	async (data: IUser, { rejectWithValue }) => {
		try {
			const response: AuthResponse = await AuthService.registration(data)
			return response
		} catch (error: any) {
			return rejectWithValue(error.response.data)
		}
	}
)

export const logout = createAsyncThunk(
	'auth/logout',
	async (_, { rejectWithValue }) => {
		try {
			const response = await AuthService.logout()
			localStorage.removeItem('accessToken')
			return response
		} catch (error: any) {
			return rejectWithValue(error.response.data)
		}
	}
)

import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthService from '../services/AuthService'
import { IUser } from '../../../entities/IUser'
import { AxiosError } from 'axios'
import { storage } from '../../../shared/lib/storage/storage'

export const login = createAsyncThunk(
	'auth/login',
	async (data: IUser, { rejectWithValue }) => {
		try {
			const response = await AuthService.login(data)
			await storage.setItem('accessToken', response.data.accessToken)
			await storage.setItem('refreshToken', response.data.refreshToken)
			return response.data
		} catch (error) {
			const err = error as AxiosError
			return rejectWithValue(err.message)
		}
	}
)

export const register = createAsyncThunk(
	'auth/register',
	async (data: IUser, { rejectWithValue }) => {
		try {
			const response = await AuthService.registration(data)
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
			await storage.removeItem('accessToken')
			return response
		} catch (error: any) {
			return rejectWithValue(error.response.data)
		}
	}
)

export const checkAuth = createAsyncThunk(
	'auth/check',
	async (_, { rejectWithValue }) => {
		try {
			const refreshToken = await storage.getItem('refreshToken')
			if (!refreshToken) {
				throw new Error('Не авторизован')
			}

			const response = await AuthService.refresh(refreshToken)

			await storage.setItem('accessToken', response.data.accessToken)

			return response.data
		} catch (error: any) {
			await storage.removeItem('accessToken')
			return rejectWithValue('Сессия истекла')
		}
	}
)

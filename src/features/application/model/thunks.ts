import { createAsyncThunk } from '@reduxjs/toolkit'
import { IMakeApplicationRequest } from '../types/IMakeApplicationRequest'
import { AxiosError } from 'axios'
import RequestService from '../service/RequestService'

export const getAllUserRequests = createAsyncThunk(
	'get_all_requests',
	async (_, { rejectWithValue }) => {
		try {
			const response = await RequestService.getAllRequests()
			return response.data
		} catch (error: any) {
			const err = error as AxiosError
			return rejectWithValue(err.message)
		}
	}
)
export const getRequestById = createAsyncThunk(
	'get_request',
	async (id: string, { rejectWithValue }) => {
		try {
			const response = await RequestService.getRequestById(id)
			return response.data
		} catch (error: any) {
			const err = error as AxiosError
			return rejectWithValue(err.message)
		}
	}
)
export const makeRequest = createAsyncThunk(
	'make_request/send',
	async (data: IMakeApplicationRequest, { rejectWithValue }) => {
		try {
			const response = await RequestService.makeRequest(data)
			return response.data
		} catch (error: any) {
			const err = error as AxiosError
			return rejectWithValue(err.message)
		}
	}
)

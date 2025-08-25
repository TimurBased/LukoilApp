import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RequestState, IRequest, IRequests, CreateRequestData } from './types'
import { requestService } from '@/shared/api/services/requestService'

const initialState: RequestState = {
	requests: [],
	currentRequest: null,
	loading: false,
	error: null,
}

export const fetchRequests = createAsyncThunk(
	'request/fetchRequests',
	async (_, { rejectWithValue }) => {
		try {
			return await requestService.getRequests()
		} catch (error: any) {
			return rejectWithValue(
				error.response?.data?.message || 'Ошибка получения заявок'
			)
		}
	}
)

export const fetchRequestById = createAsyncThunk(
	'request/fetchRequestById',
	async (id: string, { rejectWithValue }) => {
		try {
			return await requestService.getRequestById(id)
		} catch (error: any) {
			return rejectWithValue(
				error.response?.data?.message || 'Ошибка получения заявки'
			)
		}
	}
)

export const createRequest = createAsyncThunk(
	'request/createRequest',
	async (requestData: CreateRequestData, { rejectWithValue }) => {
		try {
			return await requestService.createRequest(requestData)
		} catch (error: any) {
			return rejectWithValue(
				error.response?.data?.message || 'Ошибка создания заявки'
			)
		}
	}
)

const requestSlice = createSlice({
	name: 'request',
	initialState,
	reducers: {
		clearRequestError: state => {
			state.error = null
		},
		clearCurrentRequest: state => {
			state.currentRequest = null
		},
	},
	extraReducers: builder => {
		// Fetch Requests
		builder.addCase(fetchRequests.pending, state => {
			state.loading = true
			state.error = null
		})
		builder.addCase(fetchRequests.fulfilled, (state, action) => {
			state.requests = action.payload
			state.loading = false
		})
		builder.addCase(fetchRequests.rejected, (state, action) => {
			state.loading = false
			state.error = action.payload as string
		})

		// Fetch Request By Id
		builder.addCase(fetchRequestById.pending, state => {
			state.loading = true
			state.error = null
		})
		builder.addCase(fetchRequestById.fulfilled, (state, action) => {
			state.currentRequest = action.payload
			state.loading = false
		})
		builder.addCase(fetchRequestById.rejected, (state, action) => {
			state.loading = false
			state.error = action.payload as string
		})

		// Create Request
		builder.addCase(createRequest.pending, state => {
			state.loading = true
			state.error = null
		})
		builder.addCase(createRequest.fulfilled, state => {
			state.loading = false
			// We'll fetch the updated list after creation
		})
		builder.addCase(createRequest.rejected, (state, action) => {
			state.loading = false
			state.error = action.payload as string
		})
	},
})

export const { clearRequestError, clearCurrentRequest } = requestSlice.actions

export default requestSlice.reducer

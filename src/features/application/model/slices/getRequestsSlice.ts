import { createSlice } from '@reduxjs/toolkit'
import { getRequestById, makeRequest } from '../thunks'
import { IMakeApplicationResponse } from '../../types/IMakeApplicationResponse'

interface Schema {
	isLoading: boolean
	error: string | null
	data: IMakeApplicationResponse | null
}

const initialState: Schema = {
	isLoading: false,
	error: null,
	data: null,
}

const getRequestsSlice = createSlice({
	name: 'getRequest',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getRequestById.pending, state => {
				state.isLoading = true
				state.error = null
				state.data = null
			})
			.addCase(getRequestById.fulfilled, (state, action) => {
				state.isLoading = false
				state.data = action.payload
			})
			.addCase(getRequestById.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
			})
	},
})

export default getRequestsSlice.reducer

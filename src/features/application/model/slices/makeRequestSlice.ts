import { createSlice } from '@reduxjs/toolkit'
import { makeRequest } from '../thunks'
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

const makeRequestSlice = createSlice({
	name: 'makeRequest',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(makeRequest.pending, state => {
				state.isLoading = true
				state.error = null
				state.data = null
			})
			.addCase(makeRequest.fulfilled, (state, action) => {
				state.isLoading = false
				state.data = action.payload
			})
			.addCase(makeRequest.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
			})
	},
})

export default makeRequestSlice.reducer

import { createSlice } from '@reduxjs/toolkit'
import { login, register, logout, checkAuth } from './authThunks'

export interface UserSchema {
	token: string | null
	isLoading: boolean
	error: string | null
	isAuth: boolean
}

const initialState: UserSchema = {
	token: null,
	isLoading: false,
	error: null,
	isAuth: false,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false
				state.isAuth = true
				state.token = action.payload.accessToken
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
			})
			.addCase(register.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false
				state.isAuth = true
				state.token = action.payload.accessToken
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
			})
			.addCase(logout.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(logout.fulfilled, state => {
				state.isLoading = false
				state.isAuth = false
				state.token = null
			})
			.addCase(logout.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
			})
			.addCase(checkAuth.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(checkAuth.fulfilled, (state, action) => {
				state.isLoading = false
				state.isAuth = true
				state.token = action.payload.accessToken
			})
			.addCase(checkAuth.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
			})
	},
})

export default authSlice.reducer

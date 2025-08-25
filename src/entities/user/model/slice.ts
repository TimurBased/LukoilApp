import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { UserState, LoginCredentials, RegisterData, IUser } from './types'
import { authService } from '@/shared/api/services/authService'

const initialState: UserState = {
	currentUser: null,
	isAuthenticated: false,
	loading: false,
	error: null,
}

export const login = createAsyncThunk(
	'user/login',
	async (credentials: LoginCredentials, { rejectWithValue }) => {
		try {
			await authService.login(credentials)
			return await authService.getCurrentUser()
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Ошибка входа')
		}
	}
)

export const register = createAsyncThunk(
	'user/register',
	async (userData: RegisterData, { rejectWithValue }) => {
		try {
			await authService.register(userData)
			await authService.login({
				login: userData.login,
				password: userData.password,
			})
			return await authService.getCurrentUser()
		} catch (error: any) {
			console.log(error.errors[0])
			return rejectWithValue(
				error.response?.data?.message || 'Ошибка регистрации'
			)
		}
	}
)

export const checkAuth = createAsyncThunk(
	'user/checkAuth',
	async (_, { rejectWithValue }) => {
		try {
			await authService.checkAuth()
			return await authService.getCurrentUser()
		} catch (error: any) {
			return rejectWithValue(
				error.response?.data?.message || 'Ошибка аутентификации'
			)
		}
	}
)

export const logoutUser = createAsyncThunk(
	'user/logout',
	async (_, { rejectWithValue }) => {
		try {
			await authService.logout()
			return null
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Ошибка выхода')
		}
	}
)

// export const getCurrentUser = createAsyncThunk(
// 	'user/profile',
// 	async (_, { rejectWithValue }) => {
// 		try {
// 			await authService.getCurrentUser()
// 			return null
// 		} catch (error: any) {
// 			return rejectWithValue(error.response?.data?.message || 'Ошибка выхода')
// 		}
// 	}
// )

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		clearError: state => {
			state.error = null
		},
	},
	extraReducers: builder => {
		// Login
		builder.addCase(login.pending, state => {
			state.loading = true
			state.error = null
		})
		builder.addCase(login.fulfilled, (state, action) => {
			state.currentUser = action.payload
			state.isAuthenticated = true
			state.loading = false
			state.error = null
		})
		builder.addCase(login.rejected, (state, action) => {
			state.loading = false
			state.error = action.payload as string
		})

		// Register
		builder.addCase(register.pending, state => {
			state.loading = true
			state.error = null
		})
		builder.addCase(register.fulfilled, (state, action) => {
			state.currentUser = action.payload
			state.isAuthenticated = true
			state.loading = false
			state.error = null
		})
		builder.addCase(register.rejected, (state, action) => {
			state.loading = false
			state.error = action.payload as string
		})

		// Check Auth
		builder.addCase(checkAuth.pending, state => {
			state.loading = true
			state.error = null
		})
		builder.addCase(checkAuth.fulfilled, (state, action) => {
			state.currentUser = action.payload
			state.isAuthenticated = true
			state.loading = false
			state.error = null
		})
		builder.addCase(checkAuth.rejected, (state, action) => {
			state.loading = false
			state.isAuthenticated = false
			state.currentUser = null
			state.error = null // Don't show error for auth check
		})

		// Logout
		builder.addCase(logoutUser.fulfilled, state => {
			state.currentUser = null
			state.isAuthenticated = false
			state.loading = false
			state.error = null
		})
	},
})

export const { clearError } = userSlice.actions

export default userSlice.reducer

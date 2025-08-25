import { RootState } from '@/app/providers/store'

export const selectCurrentUser = (state: RootState) => state.user.currentUser
export const selectIsAuthenticated = (state: RootState) =>
	state.user.isAuthenticated
export const selectUserLoading = (state: RootState) => state.user.loading
export const selectUserError = (state: RootState) => state.user.error

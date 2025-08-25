import { RootState } from '@/app/providers/store'

export const selectRequests = (state: RootState) => state.request.requests
export const selectCurrentRequest = (state: RootState) =>
	state.request.currentRequest
export const selectRequestLoading = (state: RootState) => state.request.loading
export const selectRequestError = (state: RootState) => state.request.error

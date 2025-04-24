import { combineReducers } from 'redux'

import makeApplicationSlice from '../../features/application/model/slices/makeRequestSlice'
import authSlice from '../../features/auth/model/authSlice'

export const rootReducer = combineReducers({
	auth: authSlice,
	makeRequest: makeApplicationSlice,
})

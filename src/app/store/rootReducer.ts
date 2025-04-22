import { combineReducers } from 'redux'
import authSlice from '../../features/auth/model/authSlice'

export const rootReducer = combineReducers({
	auth: authSlice,
})

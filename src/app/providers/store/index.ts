import { combineReducers } from 'redux'
import { storage } from '@/shared/lib/storage/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import userSlice from '@/entities/user/model/slice'
import requestSlice from '@/entities/request/model/slice'
import itemSlice from '@/entities/item/model/slice'

export const rootReducer = combineReducers({
	user: userSlice,
	request: requestSlice,
	item: itemSlice,
})

const persistConfig = {
	key: 'root',
	storage: storage,
	whitelist: ['user', 'request'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false, // Disable serializable check for redux-persist
		}),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

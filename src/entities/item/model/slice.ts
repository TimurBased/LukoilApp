import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ItemState } from './types'
import { itemService } from '@/shared/api/services/itemService'

const initialState: ItemState = {
	items: [],
	loading: false,
	error: null,
}

export const fetchItems = createAsyncThunk(
	'item/fetchItems',
	async (_, { rejectWithValue }) => {
		try {
			return await itemService.getItems()
		} catch (error: any) {
			return rejectWithValue(
				error.response?.data?.message || 'Ошибка получения предметов'
			)
		}
	}
)

const itemSlice = createSlice({
	name: 'item',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchItems.pending, state => {
			state.loading = true
			state.error = null
		})
		builder.addCase(fetchItems.fulfilled, (state, action) => {
			state.items = action.payload
			state.loading = false
		})
		builder.addCase(fetchItems.rejected, (state, action) => {
			state.loading = false
			state.error = action.payload as string
		})
	},
})

export default itemSlice.reducer

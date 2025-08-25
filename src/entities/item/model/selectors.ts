import { RootState } from '@/app/providers/store'

export const selectItems = (state: RootState) => state.item.items
export const selectItemLoading = (state: RootState) => state.item.loading
export const selectItemError = (state: RootState) => state.item.error

import { IItem } from '@/entities/item'
import { $api } from '../axios'

export const itemService = {
	async getItems(): Promise<IItem[]> {
		const response = await $api.get<IItem[]>('/items')
		return response.data
	},
}

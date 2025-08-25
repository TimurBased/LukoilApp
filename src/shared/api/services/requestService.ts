import { $api } from '../axios'
import {
	IRequest,
	IRequests,
	CreateRequestData,
} from '@/entities/request/model/types'

export const requestService = {
	async getRequests(): Promise<IRequests[]> {
		const response = await $api.get<IRequests[]>('/requests')
		return response.data
	},

	async getRequestById(id: string): Promise<IRequest> {
		const response = await $api.get<IRequest>(`/requests/${id}`)
		return response.data
	},

	async createRequest(requestData: CreateRequestData): Promise<IRequest> {
		const response = await $api.post<IRequest>('/requests', requestData)
		return response.data
	},
}

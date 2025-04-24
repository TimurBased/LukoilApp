import { $api } from '../../../shared/api/axios'
import { IMakeApplicationRequest } from '../types/IMakeApplicationRequest'
import { IMakeApplicationResponse } from '../types/IMakeApplicationResponse'
import { IRequest } from '../../../entities/IRequest'
import { IRequests } from '../../../entities/IRequests'

class RequestService {
	static async getAllRequests() {
		return await $api.get<IRequests>('/requests')
	}

	static async getRequestById(id: string) {
		return await $api.get<IRequest>(`/requests/${id}}`)
	}

	static async makeRequest(data: IMakeApplicationRequest) {
		return await $api.post<IMakeApplicationResponse>('/requests', {
			title: data.title,
			items: data.items,
		})
	}
}

export default RequestService

import { IItem } from '@/entities/item'

export interface IState {
	id: string
	name: string
}

export interface IRequests {
	id: string
	title: string
	created: string
	state: IState
}

export interface IRequest {
	id: string
	title: string
	created: string
	author: {
		firstName: string
		middleName: string
		lastName: string
		phone: string
	}
	state: IState
	items: IItem[]
}

export interface RequestState {
	requests: IRequests[]
	currentRequest: IRequest | null
	loading: boolean
	error: string | null
}

export interface CreateRequestData {
	title: string
	items: Omit<IItem, 'name'>[]
}

export enum States {
	New = 'Новая',
	InWork = 'В работе',
	Completed = 'Завершена',
	Rejected = 'Отклонено',
}

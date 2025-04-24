import { IAuthor } from './IAuthor'
import { IItem } from './IItem'
import { IState } from './IState'

export interface IRequest {
	id: string
	title: string
	created: string
	author: IAuthor
	state: IState
	items: IItem[]
}

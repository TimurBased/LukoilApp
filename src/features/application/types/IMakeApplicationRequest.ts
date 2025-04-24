import { IItem } from '../../../entities/IItem'

export interface IMakeApplicationRequest {
	title: string
	items: IItem[]
}

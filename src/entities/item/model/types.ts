export interface ItemState {
	items: IItem[]
	loading: boolean
	error: string | null
}
export interface IItem {
	id: string
	name: string
	count: number
}

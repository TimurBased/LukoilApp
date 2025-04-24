import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'

const isWeb = Platform.OS === 'web'

export const storage = {
	async getItem(key: string) {
		if (isWeb) {
			return Promise.resolve(localStorage.getItem(key))
		} else {
			return await SecureStore.getItemAsync(key)
		}
	},
	async setItem(key: string, value: string) {
		if (isWeb) {
			localStorage.setItem(key, value)
		} else {
			await SecureStore.setItemAsync(key, value)
		}
	},
	async removeItem(key: string) {
		if (isWeb) {
			localStorage.removeItem(key)
		} else {
			await SecureStore.deleteItemAsync(key)
		}
	},
}

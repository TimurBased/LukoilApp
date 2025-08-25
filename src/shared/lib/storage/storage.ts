import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'

const isWeb = Platform.OS === 'web'

export const storage = {
	async getItem(key: string) {
		if (isWeb) {
			return Promise.resolve(localStorage.getItem(key))
		} else {
			try {
				return await SecureStore.getItemAsync(key)
			} catch (error) {
				return null
			}
		}
	},
	async setItem(key: string, value: string) {
		if (isWeb) {
			localStorage.setItem(key, value)
		} else {
			try {
				await SecureStore.setItemAsync(key, value)
			} catch (error) {
				return null
			}
		}
	},
	async removeItem(key: string) {
		if (isWeb) {
			localStorage.removeItem(key)
		} else {
			try {
				await SecureStore.deleteItemAsync(key)
			} catch (error) {
				return null
			}
		}
	},
}

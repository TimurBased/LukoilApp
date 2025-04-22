import axios from 'axios'

export const $api = axios.create({
	baseURL: 'http://192.168.0.56:8181',
	headers: {
		'Accept-Language': 'es-ES,es;q=0.8',
		'Content-Type': 'application/json',

		// Accept: 'application/json',
	},
})

export const fetchData = async () => {
	try {
		const response = await $api.get('/requests')
		return response.data
	} catch (error) {
		console.error('Ошибка при запросе:', error)
	}
}

$api.interceptors.request.use(config => {
	const token = localStorage.getItem('accessToken')
	//const token = config.headers.Authorization
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

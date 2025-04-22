import { DefaultTheme } from 'react-native-paper'

const theme = {
	...DefaultTheme,
	// Specify custom property
	myOwnProperty: true,
	// Specify custom property in nested object
	colors: {
		...DefaultTheme.colors,
		primary: 'red', // Основной цвет (для filled кнопок, чекбоксов и т.п.)
		outline: 'red', // Цвет обводки (для outlined кнопок, текстовых полей и пр.)
		onPrimary: 'white', // Цвет текста на красной кнопке
		// Ниже — дополнительные настройки по желанию:
		text: 'red',
		accent: 'red', // Устаревшее, но иногда используется
		surface: '#fff', // фон компонентов
		background: '#fff',
		placeholder: 'red',
	},
}

export default theme

import React from 'react'
import AppNavigation from '../navigation/AppNavigation'
import { PaperProvider } from 'react-native-paper'
import theme from '../shared/theme/theme'
import { Provider } from 'react-redux'
import { setupStore } from './store/store'

const App: React.FC = () => {
	return (
		<Provider store={setupStore()}>
			<PaperProvider theme={theme}>
				<AppNavigation />
			</PaperProvider>
		</Provider>
	)
}

export default App

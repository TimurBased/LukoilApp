import React, { useEffect } from 'react'
import AppNavigation from '../navigation/AppNavigation'
import { ActivityIndicator, PaperProvider } from 'react-native-paper'
import theme from '../shared/theme/theme'
import { Provider } from 'react-redux'
import { setupStore } from './store/store'
import { useAppDispatch, useAppSelector } from '../hooks/useApp'
import { checkAuth } from '../features/auth/model/authThunks'

const store = setupStore()

const AppContent: React.FC = () => {
	const dispatch = useAppDispatch()
	const { isLoading } = useAppSelector(state => state.auth)

	useEffect(() => {
		dispatch(checkAuth())
	}, [])

	if (isLoading) {
		return (
			<PaperProvider theme={theme}>
				<ActivityIndicator
					style={{ flex: 1, justifyContent: 'center' }}
					size='large'
					animating={true}
				/>
			</PaperProvider>
		)
	}

	return (
		<PaperProvider theme={theme}>
			<AppNavigation />
		</PaperProvider>
	)
}

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<AppContent />
		</Provider>
	)
}

export default App

import React from 'react'

import { Provider, useSelector } from 'react-redux'
import { persistor, store } from './providers/store/index'

import { PersistGate } from 'redux-persist/integration/react'
import { selectIsAuthenticated } from '@/entities/user'
import RootNavigator from '@/navigation/RootNavigation'

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<RootNavigator />
			</PersistGate>
		</Provider>
	)
}

export default App

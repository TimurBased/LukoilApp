import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Avatar, Button, Portal, Modal, Snackbar } from 'react-native-paper'
import { MakeRequestConnector } from '../../../features/application/connector/MakeRequestConnector'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp } from '../../../navigation/RootStackParams'

const HomeScreen: React.FC = () => {
	const [modalVisible, setModalVisible] = useState(false)
	const [snackbarVisible, setSnackbarVisible] = useState(false)

	const navigation = useNavigation<NavigationProp>()

	return (
		<>
			<View style={styles.container}>
				<Avatar.Image
					size={150}
					source={require('../../../../assets/logo.png')}
				/>
				<View style={styles.buttonContainer}>
					<Button
						icon={'calendar-edit'}
						mode='contained'
						buttonColor={'red'}
						onPress={() => setModalVisible(true)}
						style={styles.buttonStyles}
					>
						Создать заявку
					</Button>
					<Button
						icon={'calendar-month'}
						textColor={'red'}
						mode='outlined'
						onPress={() => navigation.navigate('MyApplications')}
						style={styles.buttonStyles}
					>
						Мои заявки
					</Button>
				</View>
			</View>

			<Portal>
				<Modal
					visible={modalVisible}
					onDismiss={() => setModalVisible(false)}
					contentContainerStyle={styles.modalContainer}
				>
					<MakeRequestConnector
						onSuccess={() => {
							setModalVisible(false)
							setSnackbarVisible(true)
						}}
					/>
				</Modal>
			</Portal>

			<Snackbar
				visible={snackbarVisible}
				onDismiss={() => setSnackbarVisible(false)}
				duration={3000}
				style={styles.snackbar}
				action={{
					label: 'Ок',
					labelStyle: styles.snackbarActionLabel,
					onPress: () => {
						setSnackbarVisible(false)
					},
				}}
			>
				<Text style={styles.snackbarText}>Заявка отправлена ✅</Text>
			</Snackbar>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		padding: 20,
	},
	buttonContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonStyles: {
		marginBottom: 10,
	},
	modalContainer: {
		backgroundColor: 'white',
		padding: 20,
		marginHorizontal: 20,
		borderRadius: 10,
	},
	snackbar: {
		backgroundColor: 'white',
		borderColor: 'red',
		borderWidth: 1.5,
		borderRadius: 10,
		marginHorizontal: 20,
		marginBottom: 30,
		elevation: 4,
	},
	snackbarText: {
		color: 'red',
		fontWeight: '600',
	},
	snackbarActionLabel: {
		color: 'red',
		fontWeight: 'bold',
	},
})

export default HomeScreen

import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import {
	DataTable,
	Searchbar,
	Portal,
	Modal,
	Card,
	Button,
	Text,
} from 'react-native-paper'
import { IRequests } from '../../../entities/IRequests'

interface Props {
	data: IRequests[]
}

const UserRequestsView: React.FC<Props> = ({ data }) => {
	const [searchQuery, setSearchQuery] = useState('')
	const [selectedRequest, setSelectedRequest] = useState<IRequests | null>(null)

	const filteredData = data.filter(
		item =>
			item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.state.name.toLowerCase().includes(searchQuery.toLowerCase())
	)

	const openModal = (request: IRequests) => {
		setSelectedRequest(request)
	}

	const closeModal = () => {
		setSelectedRequest(null)
	}

	return (
		<View style={styles.container}>
			<Searchbar
				placeholder='Поиск...'
				onChangeText={setSearchQuery}
				value={searchQuery}
				style={styles.searchbar}
			/>
			<DataTable style={styles.dataTable}>
				<DataTable.Header>
					<DataTable.Title>Название</DataTable.Title>
					<DataTable.Title>Состояние</DataTable.Title>
					<DataTable.Title>Дата создания</DataTable.Title>
				</DataTable.Header>

				{filteredData.map(item => (
					<DataTable.Row key={item.id} onPress={() => openModal(item)}>
						<DataTable.Cell>{item.title}</DataTable.Cell>
						<DataTable.Cell>{item.state.name}</DataTable.Cell>
						<DataTable.Cell>{item.created}</DataTable.Cell>
					</DataTable.Row>
				))}
			</DataTable>

			<Portal>
				<Modal
					visible={selectedRequest !== null}
					onDismiss={closeModal}
					contentContainerStyle={styles.modalContainer}
				>
					test
					{/* {selectedRequest && (
						<Card style={styles.card}>
							<Card.Title
								title={selectedRequest.title}
								subtitle={`Автор: ${
									selectedRequest.author.firstName +
									' ' +
									selectedRequest.author.middleName
								}`}
							/>
							<Card.Content>
								<Text variant='bodyMedium'>
									Дата создания: {selectedRequest.created}
								</Text>
								<Text variant='bodyMedium' style={styles.description}>
									Состояние: {selectedRequest.state.name}
								</Text>
							</Card.Content>
							<Card.Actions>
								<Button onPress={closeModal}>Поддержка</Button>
								<Button onPress={closeModal}>Закрыть</Button>
							</Card.Actions>
						</Card>
					)} */}
				</Modal>
			</Portal>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	searchbar: {
		marginBottom: 20,
	},
	dataTable: {
		flex: 1,
		marginLeft: 'auto',
	},
	modalContainer: {
		backgroundColor: 'white',
		marginHorizontal: 'auto',
		borderRadius: 10,
		maxWidth: 600,
		width: 'auto',
	},
	card: {
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	description: {
		marginTop: 10,
	},
})

export default UserRequestsView

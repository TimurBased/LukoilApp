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

interface IAuthor {
	firstName: string
	middleName: string
	lastName: string
	phone: string
}
interface IState {
	id: string
	name: string
}
interface RequestProps {
	id: string
	title: string
	created: string
	author: IAuthor
	state: IState
}

interface Props {
	data: RequestProps[]
}

const MyApplicationsView: React.FC<Props> = ({ data }) => {
	const [searchQuery, setSearchQuery] = useState('')
	const [selectedRequest, setSelectedRequest] = useState<RequestProps | null>(
		null
	)

	const filteredData = data.filter(
		item =>
			item.author.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.author.phone.toLowerCase().includes(searchQuery.toLowerCase())
	)

	const openModal = (request: RequestProps) => {
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
					<DataTable.Title>Автор</DataTable.Title>
					<DataTable.Title>Дата создания</DataTable.Title>
				</DataTable.Header>

				{filteredData.map(item => (
					<DataTable.Row key={item.id} onPress={() => openModal(item)}>
						<DataTable.Cell>{item.title}</DataTable.Cell>
						<DataTable.Cell>
							{item.author.firstName + ' ' + item.author.lastName}
						</DataTable.Cell>
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
					{selectedRequest && (
						<Card style={styles.card}>
							<Card.Title
								title={selectedRequest.title}
								subtitle={`Автор: ${selectedRequest.author.firstName}`}
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
					)}
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
		maxWidth: 300,
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

export default MyApplicationsView

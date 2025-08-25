import React, { useState } from 'react'
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	Modal,
	SafeAreaView,
	ScrollView,
	FlatList,
} from 'react-native'
import { useSelector } from 'react-redux'
import { IItem, selectItems } from '@/entities/item'
import { Minus, Plus, X } from 'lucide-react-native'
import { Button, Input } from '@/shared/ui'
import {
	BORDER_RADIUS,
	COLORS,
	FONT_SIZE,
	SPACING,
} from '@/shared/config/theme'

interface ItemSelectorProps {
	selectedItems: IItem[]
	onItemsChange: (items: IItem[]) => void
}

export const ItemSelector: React.FC<ItemSelectorProps> = ({
	onItemsChange,
	selectedItems,
}) => {
	const [modalVisible, setModalVisible] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const items = useSelector(selectItems)

	const filteredItems = items.filter(item =>
		item.name.toLowerCase().includes(searchQuery.toLowerCase())
	)

	const isItemSelected = (id: string) => {
		return selectedItems.some(item => item.id === id)
	}

	const getItemQuantity = (id: string) => {
		const item = selectedItems.find(item => item.id === id)
		return item ? item.count : 0
	}

	const addItem = (id: string, name: string) => {
		if (isItemSelected(id)) {
			// Update quantity
			const updatedItems = selectedItems.map(item =>
				item.id === id ? { ...item, count: item.count + 1 } : item
			)
			onItemsChange(updatedItems)
		} else {
			// Add new item
			onItemsChange([...selectedItems, { id, name, count: 1 }])
		}
	}

	const removeItem = (id: string) => {
		const currentQuantity = getItemQuantity(id)

		if (currentQuantity <= 1) {
			// Remove item completely
			onItemsChange(selectedItems.filter(item => item.id !== id))
		} else {
			// Decrease quantity
			const updatedItems = selectedItems.map(item =>
				item.id === id ? { ...item, count: item.count - 1 } : item
			)
			onItemsChange(updatedItems)
		}
	}

	const renderItem = ({ item }: { item: { id: string; name: string } }) => {
		const isSelected = isItemSelected(item.id)
		const quantity = getItemQuantity(item.id)

		return (
			<View style={styles.itemRow}>
				<Text style={styles.itemName}>{item.name}</Text>

				<View style={styles.quantityControls}>
					{isSelected ? (
						<>
							<TouchableOpacity
								style={styles.quantityButton}
								onPress={() => {
									removeItem(item.id)
								}}
							>
								<Minus size={16} color={COLORS.text} />
							</TouchableOpacity>

							<Text style={styles.quantityText}>{quantity}</Text>

							<TouchableOpacity
								style={styles.quantityButton}
								onPress={() => {
									addItem(item.id, item.name)
								}}
							>
								<Plus size={16} color={COLORS.text} />
							</TouchableOpacity>
						</>
					) : (
						<TouchableOpacity
							style={styles.addButtonStyles}
							onPress={() => {
								addItem(item.id, item.name)
							}}
						>
							<Plus size={16} color={COLORS.primary} />
							<Text style={styles.addButtonText}>Добавить</Text>
						</TouchableOpacity>
					)}
				</View>
			</View>
		)
	}
	return (
		<View>
			<View style={styles.header}>
				<TouchableOpacity
					style={styles.addItemsButton}
					onPress={() => setModalVisible(true)}
				>
					<Plus size={16} color={COLORS.primary} />
					<Text style={styles.addItemsText}>Добавить предметы</Text>
				</TouchableOpacity>
			</View>
			<Modal
				animationType='slide'
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContent}>
						<View style={styles.modalHeader}>
							<Text style={styles.modalTitle}>Выбор предметов</Text>
							<TouchableOpacity
								onPress={() => {
									setModalVisible(false)
									onItemsChange([])
								}}
							>
								<X size={24} color={COLORS.text} />
							</TouchableOpacity>
						</View>

						<Input
							placeholder='Поиск предметов...'
							value={searchQuery}
							onChangeText={setSearchQuery}
							containerStyle={styles.searchInput}
						/>

						<FlatList
							data={filteredItems}
							renderItem={renderItem}
							keyExtractor={item => item.id}
						/>

						<View style={styles.modalFooter}>
							<Button
								title='Готово'
								onPress={() => setModalVisible(false)}
								disabled={selectedItems.length === 0}
								style={styles.modalButton}
							/>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	title: {
		fontSize: 16,
		fontWeight: '600',
		color: COLORS.text,
	},
	addButton: {
		marginTop: SPACING.sm,
	},
	addItemsButton: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	addItemsText: {
		marginLeft: 4,
		color: COLORS.primary,
		fontWeight: '500',
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContent: {
		backgroundColor: COLORS.white,
		borderRadius: BORDER_RADIUS.lg,
		width: '90%',
		maxHeight: '80%',
		padding: SPACING.lg,
	},
	modalHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: SPACING.lg,
	},
	modalTitle: {
		fontSize: FONT_SIZE.xl,
		fontWeight: '600',
		color: COLORS.text,
	},
	itemButton: {
		backgroundColor: COLORS.surface,
		borderRadius: BORDER_RADIUS.md,
		padding: SPACING.md,
		marginBottom: SPACING.sm,
		width: 'auto',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	selectedItemButton: {
		backgroundColor: COLORS.primary,
	},
	searchInput: {
		marginBottom: 12,
	},
	itemButtonText: {
		color: COLORS.text,
		fontSize: FONT_SIZE.md,
	},
	selectedItemButtonText: {
		color: COLORS.white,
	},
	checkIcon: {
		marginLeft: SPACING.xs,
	},
	quantityContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: SPACING.lg,
	},
	quantityLabel: {
		fontSize: FONT_SIZE.md,
		marginRight: SPACING.md,
		color: COLORS.text,
	},
	quantityInput: {
		flex: 1,
		marginBottom: 0,
	},
	modalFooter: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	modalButton: {
		flex: 1,
		marginHorizontal: SPACING.xs,
	},
	///////
	itemRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.primaryDark,
	},
	itemName: {
		fontSize: 14,
		color: COLORS.text,
		flex: 1,
	},
	quantityControls: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	quantityButton: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: '#F0F0F0',
		justifyContent: 'center',
		alignItems: 'center',
	},
	quantityText: {
		marginHorizontal: 12,
		fontSize: 14,
		fontWeight: '600',
		color: COLORS.text,
		minWidth: 20,
		textAlign: 'center',
	},
	addButtonStyles: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: COLORS.primaryDark,
	},
	addButtonText: {
		marginLeft: 4,
		color: COLORS.primary,
		fontWeight: '500',
	},
	doneButton: {
		marginTop: 16,
	},
})

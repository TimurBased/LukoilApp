import React, { useState, useEffect } from 'react'
import {
	View,
	StyleSheet,
	ScrollView,
	Text,
	Alert,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { createRequest, fetchRequests } from '@/entities/request/model/slice'
import { selectRequestLoading } from '@/entities/request/model/selectors'
import { selectItems } from '@/entities/item/model/selectors'
import { fetchItems } from '@/entities/item/model/slice'

import { ItemSelector } from './ItemSelector'
import { AppDispatch } from '@/app/providers/store'
import { RootStackParamList } from '@/navigation/types'
import { COLORS, FONT_SIZE, SPACING } from '@/shared/config/theme'
import { Button, Card, Input } from '@/shared/ui'
import { IItem } from '@/entities/item'

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

const CreateRequestSchema = Yup.object().shape({
	title: Yup.string()
		.min(3, 'Название должно содержать минимум 3 символа')
		.required('Название заявки обязательно'),
})

export const CreateRequestForm = () => {
	const [selectedItems, setSelectedItems] = useState<
		(IItem & { name: string })[]
	>([])

	const dispatch = useDispatch<AppDispatch>()
	const navigation = useNavigation<NavigationProp>()
	const loading = useSelector(selectRequestLoading)
	const items = useSelector(selectItems)

	useEffect(() => {
		dispatch(fetchItems())
	}, [dispatch])

	const handleRemoveItem = (itemId: string) => {
		setSelectedItems(selectedItems.filter(item => item.id !== itemId))
	}

	const handleSubmit = async (values: { title: string }) => {
		if (selectedItems.length === 0) {
			Alert.alert('Ошибка', 'Добавьте хотя бы один предмет в заявку')
			return
		}

		try {
			const requestData = {
				title: values.title,
				items: selectedItems.map(item => ({ id: item.id, count: item.count })),
			}

			await dispatch(createRequest(requestData)).unwrap()
			await dispatch(fetchRequests()).unwrap()

			Alert.alert('Успех', 'Заявка успешно создана')
			navigation.replace('Requests')
		} catch (error) {
			Alert.alert('Ошибка', error as string)
		}
	}

	return (
		<ScrollView contentContainerStyle={styles.scrollContainer}>
			<Formik
				initialValues={{ title: '' }}
				validationSchema={CreateRequestSchema}
				onSubmit={handleSubmit}
			>
				{({
					handleChange,
					handleBlur,
					handleSubmit,
					values,
					errors,
					touched,
				}) => (
					<View style={styles.container}>
						<Input
							label='Название заявки'
							value={values.title}
							onChangeText={handleChange('title')}
							onBlur={handleBlur('title')}
							placeholder='Введите название заявки'
							error={touched.title && errors.title ? errors.title : ''}
						/>
						<View style={styles.itemRow}>
							<Text style={styles.sectionTitle}>
								Выбранные предметы ({selectedItems.length})
							</Text>
							<ItemSelector
								onItemsChange={setSelectedItems}
								selectedItems={selectedItems}
							/>
						</View>

						{selectedItems.length > 0 ? (
							<View style={styles.selectedItemsContainer}>
								{selectedItems.map(item => (
									<Card key={item.id} style={styles.itemCard}>
										<View style={styles.itemRow}>
											<Text style={styles.itemName}>{item.name}</Text>
											<Text style={styles.itemQuantity}>
												Количество: {item.count}
											</Text>
										</View>
										<Button
											title='Удалить'
											variant='text'
											size='small'
											onPress={() => handleRemoveItem(item.id)}
											style={styles.removeButton}
										/>
									</Card>
								))}
							</View>
						) : (
							<Text style={styles.emptyText}>Нет выбранных предметов</Text>
						)}

						<Button
							title='Создать заявку'
							onPress={() => {
								handleSubmit()
							}}
							loading={loading}
							style={styles.submitButton}
						/>
					</View>
				)}
			</Formik>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	scrollContainer: {
		flexGrow: 1,
	},
	container: {
		padding: SPACING.md,
	},
	sectionTitle: {
		fontSize: FONT_SIZE.lg,
		fontWeight: '600',
		marginTop: SPACING.lg,
		marginBottom: SPACING.sm,
		color: COLORS.text,
	},
	selectedItemsContainer: {
		marginTop: SPACING.md,
	},
	itemCard: {
		marginBottom: SPACING.sm,
	},
	itemRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: SPACING.xs,
	},
	itemName: {
		fontSize: FONT_SIZE.md,
		fontWeight: '500',
		color: COLORS.text,
	},
	itemQuantity: {
		fontSize: FONT_SIZE.sm,
		color: COLORS.textSecondary,
	},
	removeButton: {
		alignSelf: 'flex-end',
	},
	submitButton: {
		marginTop: SPACING.xl,
		marginBottom: SPACING.xl,
	},
	emptyText: {
		color: COLORS.textSecondary,
		textAlign: 'center',
		padding: 16,
		borderWidth: 1,
		borderColor: 'grey',
		borderRadius: 8,
		borderStyle: 'dashed',
	},
})

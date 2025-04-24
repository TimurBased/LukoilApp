import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { FormikErrors, useFormik } from 'formik'

// Твой условный склад
const warehouse = [
	{ id: '2635fc1b-f064-46fe-9f76-1283f6881d5b', name: 'Item 2', available: 8 },
	{ id: '9de240a9-5a43-48b6-afd3-01c60361e918', name: 'Item 3', available: 6 },
	{ id: 'd07b3da6-d515-461b-8171-421d5e2b9cde', name: 'Item 1', available: 10 },
]

interface FormValues {
	title: string
	items: { id: string; count: number }[]
}

interface Props {
	submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>
	error: string | null
	isLoading: boolean
}

const MakeRequestView: React.FC<Props> = ({ submit, error, isLoading }) => {
	const formik = useFormik<FormValues>({
		initialValues: {
			title: '',
			items: warehouse.map(item => ({ id: item.id, count: 0 })),
		},
		onSubmit: async (values, { setErrors, setSubmitting }) => {
			const filteredItems = values.items.filter(item => item.count > 0)
			const payload = { ...values, items: filteredItems }

			const errors = await submit(payload)
			if (errors) {
				setErrors(errors)
			}
			setSubmitting(false)
		},
	})

	const handleItemCountChange = (index: number, value: string) => {
		const count = parseInt(value, 10)
		const safeCount = isNaN(count) ? 0 : count
		formik.setFieldValue(`items[${index}].count`, safeCount)
	}

	return (
		<View style={styles.container}>
			<TextInput
				label='Название заявки'
				style={styles.input}
				value={formik.values.title}
				onChangeText={formik.handleChange('title')}
			/>

			{warehouse.map((item, index) => (
				<View key={item.id} style={styles.itemRow}>
					<Text style={styles.label}>
						{item.name} (доступно: {item.available})
					</Text>
					<TextInput
						mode='outlined'
						keyboardType='numeric'
						style={styles.countInput}
						value={formik.values.items[index].count.toString()}
						onChangeText={value => handleItemCountChange(index, value)}
					/>
				</View>
			))}

			<Button
				mode='contained'
				onPress={() => formik.handleSubmit()}
				disabled={formik.isSubmitting}
			>
				Отправить заявку
			</Button>
		</View>
	)
}

export default MakeRequestView

const styles = StyleSheet.create({
	container: {
		padding: 20,
		gap: 16,
	},
	input: {
		backgroundColor: 'white',
	},
	itemRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	label: {
		flex: 1,
		marginRight: 10,
	},
	countInput: {
		width: 80,
		backgroundColor: 'white',
	},
})

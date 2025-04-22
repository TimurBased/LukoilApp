import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { FormikErrors, FormikProps, withFormik } from 'formik'
import { Button, Checkbox, TextInput } from 'react-native-paper'

interface FormValues {
	FIO: string
	equipment: string
	date: string
	agreed: boolean
}

interface Props {
	submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>
}

const ApplicationForm: React.FC<FormikProps<FormValues> & Props> = ({
	handleSubmit,
	values,
	handleChange,
	setFieldValue,
}) => {
	return (
		<View style={styles.container}>
			<View style={styles.form}>
				<TextInput
					style={styles.input}
					label='ФИО'
					value={values.FIO}
					onChangeText={handleChange('FIO')}
				/>
				<TextInput
					style={styles.input}
					label='Оборудование'
					value={values.equipment}
					onChangeText={handleChange('equipment')}
				/>
				<TextInput
					style={styles.input}
					label='Дата'
					value={values.date}
					onChangeText={handleChange('date')}
				/>

				<View style={styles.checkboxRow}>
					<Checkbox
						status={values.agreed ? 'checked' : 'unchecked'}
						onPress={() => setFieldValue('agreed', !values.agreed)}
					/>
					<Text>Согласен</Text>
				</View>

				<Button
					mode='contained'
					buttonColor='red'
					onPress={() => handleSubmit()}
					disabled={!values.agreed}
				>
					Отправить заявку
				</Button>
			</View>
		</View>
	)
}

export const ApplicationView = withFormik<Props, FormValues>({
	mapPropsToValues: () => ({
		FIO: '',
		equipment: '',
		date: '',
		agreed: false,
	}),
	handleSubmit: async (values, { props, setErrors }) => {
		const error = await props.submit(values)
		if (error) {
			setErrors(error)
		}
	},
})(ApplicationForm)

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		padding: 20,
	},
	form: {
		gap: 16,
	},
	input: {
		backgroundColor: 'white',
	},
	checkboxRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
})

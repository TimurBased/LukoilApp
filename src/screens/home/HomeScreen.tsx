import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { FileText, FilePlus } from 'lucide-react-native'
import { RootStackParamList } from '@/navigation/types'
import { Button } from '@/shared/ui'
import { COLORS, FONT_SIZE, SPACING } from '@/shared/config/theme'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '@/entities/user'

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

const HomeScreen = () => {
	const navigation = useNavigation<NavigationProp>()
	const user = useSelector(selectCurrentUser)
	return (
		<View style={styles.container}>
			<View style={styles.logoContainer}>
				<View style={styles.logoCircle}>
					<Image
						style={styles.logoStyles}
						source={require('@/../assets/logo.png')}
					/>
				</View>

				<Text style={styles.appName}>
					Добро пожаловать,{' '}
					<Text style={{ color: COLORS.divider }}>
						{user?.middleName} {user?.firstName}!
					</Text>
				</Text>
			</View>

			<View style={styles.buttonsContainer}>
				<Button
					title='Мои заявки'
					onPress={() => navigation.navigate('Requests')}
					style={styles.button}
					textStyle={styles.buttonText}
					size='large'
				/>
				<View style={styles.buttonIcon}>
					<FileText size={24} color={COLORS.white} />
				</View>
			</View>

			<View style={styles.buttonsContainer}>
				<Button
					variant='outline'
					title='Создать заявку'
					onPress={() => navigation.navigate('CreateRequest')}
					style={styles.button}
					textStyle={styles.buttonText}
					size='large'
				/>

				<View style={styles.buttonIcon}>
					<FilePlus size={24} color={COLORS.primary} />
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: SPACING.xl,
	},
	logoContainer: {
		alignItems: 'center',
		marginBottom: SPACING.xxl,
	},
	logoCircle: {
		width: 120,
		height: 120,
		borderRadius: 60,
		backgroundColor: '#DB2B36',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: SPACING.md,
	},
	logoStyles: {
		width: 90,
		height: 90,
	},
	appName: {
		fontSize: FONT_SIZE.xxl,
		fontWeight: 'bold',
		color: COLORS.text,
		textAlign: 'center',
	},
	buttonsContainer: {
		width: '100%',
		marginBottom: SPACING.lg,
		position: 'relative',
	},
	button: {
		width: '100%',
		height: 60,
	},
	buttonText: {
		fontSize: FONT_SIZE.lg,
	},
	buttonIcon: {
		position: 'absolute',
		right: SPACING.lg,
		top: '50%',
		transform: [{ translateY: -12 }],
	},
})

export default HomeScreen

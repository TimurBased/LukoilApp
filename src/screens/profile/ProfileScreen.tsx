import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Card, Button } from '@/shared/ui'
import { logoutUser } from '@/entities/user/model/slice'
import { selectCurrentUser } from '@/entities/user/model/selectors'
import { COLORS, SPACING, FONT_SIZE } from '@/shared/config/theme'
import { User, LogOut } from 'lucide-react-native'

import { AppDispatch } from '@/app/providers/store'
import { RootStackParamList } from '@/navigation/types'

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

const ProfileScreen = () => {
	const dispatch = useDispatch<AppDispatch>()
	const navigation = useNavigation<NavigationProp>()
	const currentUser = useSelector(selectCurrentUser)

	if (!currentUser) {
		return (
			<View style={styles.container}>
				<Text style={styles.notLoggedInText}>Вы не авторизованы</Text>
				<Button
					title='Войти'
					onPress={() => navigation.navigate('Login')}
					style={styles.loginButton}
				/>
			</View>
		)
	}

	const handleLogout = () => {
		Alert.alert('Выход из аккаунта', 'Вы уверены, что хотите выйти?', [
			{ text: 'Отмена', style: 'cancel' },
			{
				text: 'Выйти',
				onPress: () => {
					dispatch(logoutUser())
				},
				style: 'destructive',
			},
		])
	}

	return (
		<View style={styles.container}>
			<Card style={styles.profileCard}>
				<View style={styles.avatarContainer}>
					<View style={styles.avatar}>
						<User size={40} color={COLORS.white} />
					</View>
				</View>

				<Text style={styles.name}>
					{currentUser.lastName} {currentUser.firstName}{' '}
					{currentUser.middleName}
				</Text>

				<View style={styles.infoContainer}>
					<View style={styles.infoRow}>
						<Text style={styles.infoLabel}>Логин:</Text>
						<Text style={styles.infoValue}>{currentUser.login}</Text>
					</View>

					<View style={styles.infoRow}>
						<Text style={styles.infoLabel}>Телефон:</Text>
						<Text style={styles.infoValue}>{currentUser.phone}</Text>
					</View>

					<View style={styles.infoRow}>
						<Text style={styles.infoLabel}>ID пользователя:</Text>
						<Text style={styles.infoValue}>{currentUser.id}</Text>
					</View>
				</View>

				<TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
					<LogOut size={20} color={COLORS.error} />
					<Text style={styles.logoutText}>Выйти из аккаунта</Text>
				</TouchableOpacity>
			</Card>
		</View>
	)
}

export default ProfileScreen
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: SPACING.md,
	},
	profileCard: {
		alignItems: 'center',
	},
	avatarContainer: {
		marginBottom: SPACING.lg,
	},
	avatar: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: COLORS.primary,
		justifyContent: 'center',
		alignItems: 'center',
	},
	name: {
		fontSize: FONT_SIZE.xl,
		fontWeight: '600',
		color: COLORS.text,
		marginBottom: SPACING.md,
		textAlign: 'center',
	},
	infoContainer: {
		width: '100%',
		marginBottom: SPACING.lg,
	},
	infoRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: SPACING.sm,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.divider,
	},
	infoLabel: {
		fontSize: FONT_SIZE.md,
		color: COLORS.textSecondary,
	},
	infoValue: {
		fontSize: FONT_SIZE.md,
		color: COLORS.text,
		fontWeight: '500',
	},
	logoutButton: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: SPACING.md,
	},
	logoutText: {
		marginLeft: SPACING.sm,
		color: COLORS.error,
		fontSize: FONT_SIZE.md,
		fontWeight: '500',
	},
	notLoggedInText: {
		fontSize: FONT_SIZE.lg,
		color: COLORS.textSecondary,
		textAlign: 'center',
		marginBottom: SPACING.lg,
	},
	loginButton: {
		alignSelf: 'center',
		width: '50%',
	},
})

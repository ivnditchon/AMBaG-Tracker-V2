import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';

export type FooterMenuProps = {
	icon: React.ComponentProps<typeof Ionicons>['name'];
	size?: number;
	color?: string;
	label: string;
};

const FooterMenu = ({icon, size, color, label}: FooterMenuProps) => {
  	return (
		<View style={styles.container}>
			<Ionicons name={icon} size={size} color={color} />
			<Text style={styles.label}>
				{label}
			</Text>
		</View>
 	);
};

export default FooterMenu;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},

	label: {
		marginTop: 12,
		fontFamily: 'InterMedium',
		fontSize: 12,
		color: colors.text
	}
});
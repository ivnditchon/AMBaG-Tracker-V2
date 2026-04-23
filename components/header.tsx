import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

type HeaderProps = {
	backIcon?: React.ReactNode;
	title?: string;
	menuIcon?: React.ReactNode;
};

const Header = ({backIcon, title, menuIcon}: HeaderProps) => {
	return (
		<View style={styles.container}>
			{backIcon && (
				<View>
					{backIcon}
				</View>
			)}
			<View style={styles.titleContainer}>
				<Text style={styles.title}>
					{title}
				</Text>
			</View>
			{menuIcon && (
				<View>
					{menuIcon}
				</View>
			)}
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
		height: 50,
		paddingHorizontal: 15,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderColor: '#ebeef3',
		justifyContent: 'space-between'
	},

	titleContainer: {
		flex: 1
	},
	
	title: {
		fontFamily: 'InterBold',
		color: '#2C2C2C',
		fontSize: 28,
		letterSpacing: 0.5,
		textAlign: 'center'
	}
});
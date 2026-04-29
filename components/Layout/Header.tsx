import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

type HeaderProps = {
	leftComponent?: React.ReactNode;
	rightComponent?: React.ReactNode;
	bottomComponent?: React.ReactNode;
};

const Header = ({leftComponent, rightComponent, bottomComponent}: HeaderProps) => {
	return (
		<View>
			<LinearGradient
				colors={['#007A56', '#00956A', '#00C588']}
				start={{x: 0, y: 0}}
				end={{x: 1, y: 1}}
				style={styles.mainContainer}
			>
				<View style={styles.subContainer}>
					{leftComponent}
					{rightComponent}
				</View>
				{bottomComponent}
			</LinearGradient>
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	mainContainer: {	
		width: "100%",
		padding: 25,
		justifyContent: 'center'
	},

	subContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	}
});
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import { colors } from '@/constants/colors';

type AvatarProps = {
	initial: string;
	customStyle?: StyleProp<ViewStyle>
};

const Avatar = ({initial, customStyle}: AvatarProps) => {
  	return (
		<View style={[styles.container, customStyle]}>
			<Text style={styles.initial}>{initial}</Text>
		</View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
	container: {
		width: 40,
      height: 40,
      borderRadius: 100,
      backgroundColor: 'rgba(255,255,255,0.18)',
      alignItems: 'center',
      justifyContent: 'center',
		borderWidth: 2,
		borderColor: 'rgba(255,255,255,0.18)'
	},

	initial: {
		fontFamily: 'InterBold',
		color: colors.white,
		letterSpacing: 0.5
	}
});
import { StyleSheet, Text, TextStyle, StyleProp, ViewStyle, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

type ButtonProps = {
    title: string;
    customContainerStyle: StyleProp<ViewStyle>;
    customTitleStyle: StyleProp<TextStyle>
    icon?: React.ComponentProps<typeof Ionicons>['name'];
    iconSize: number;
    iconColor: string;
    onPress: () => void;
};

const Button = ({title, customContainerStyle, customTitleStyle, icon, iconSize, iconColor, onPress}: ButtonProps) => {
    return (
        <TouchableOpacity 
            style={[styles.container, customContainerStyle]}
            onPress={onPress}
        >
            {icon && (
                <Ionicons
                    name={icon}
                    size={iconSize}
                    color={iconColor}
                />
            )}
            <Text style={[styles.title, customTitleStyle]}>
                {title}
            </Text>
        </TouchableOpacity>
        /** <Pressable style={({pressed}) => [
            styles.container, 
            {
                transform: [{ scale: pressed ? 0.97 : 1 }],
                backgroundColor: pressed  ? colors.primary : colors.primary
            }
        ]}
        onPress={onPress}
        >
            <Text style={styles.title}>
                {title}
            </Text>
        </Pressable> */
    );
};

export default Button;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },

    title: {
        fontFamily: 'InterBold',
    }
});
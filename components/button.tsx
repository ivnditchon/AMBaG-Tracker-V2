import { StyleSheet, Text, Pressable, View } from 'react-native'
import React from 'react'

type ButtonProps = {
    title: string;
    onPress: () => void;
};

const Button = ({title, onPress}: ButtonProps) => {
    return (
        <Pressable style={({pressed}) => [
            styles.container, {
                transform: [{ scale: pressed ? 0.97 : 1 }],
                backgroundColor: pressed  ? '#003296' : '#185BE6'
            }
        ]}
        onPress={onPress}
        >
            <Text style={styles.title}>
                {title}
            </Text>
        </Pressable>
    );
};

export default Button;

const styles = StyleSheet.create({
    container: {
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#185BE6',
        borderRadius: 10
    },

    title: {
        fontFamily: 'InterBold',
        fontSize: 24,
        color: '#F1F1F1'
    }
});
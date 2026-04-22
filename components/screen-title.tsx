import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type ScreenTitleProps = {
    title: string;
    subTitle?: string;
};

const ScreenTitle = ({title, subTitle}: ScreenTitleProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {title}
            </Text>
            <View style={styles.subTitleContainer}>
                <Text style={styles.subTitle}>
                    {subTitle}
                </Text>
            </View>
        </View>
    )
}

export default ScreenTitle;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    title: {
        fontFamily: 'InterBold',
        fontSize: 36,
        color: '#2C2C2C',
        letterSpacing: 0.2
    },
    
    subTitleContainer: {
        marginTop: 15
    },

    subTitle: {
        textAlign: 'center',
        fontFamily: 'InterMedium',
        fontSize: 16,
        color: '#2C2C2C',
        opacity: 0.5,
        lineHeight: 23
    }
});
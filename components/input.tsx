import { 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    View, 
    StyleProp, 
    ViewStyle
} from 'react-native'
import React, { useState } from 'react';

type InputProps = {
    value: string,
    placeHolder: string
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    secureTextEntry?: boolean;
    onChangeText: (text: string) => void;
    onPress?: () => void;
    dynamicStyle?: StyleProp<ViewStyle>;
}

const Input = ({value, 
    placeHolder, 
    iconLeft, 
    iconRight, 
    secureTextEntry, 
    onChangeText,
    onPress,
    dynamicStyle}: InputProps) => {

    const [isFocus, setFocused] = useState(false);

    return (
        <View style={[styles.container, 
            {
                borderColor: isFocus ? '#185BE6' : '#D1D5DB',
                borderWidth: isFocus ? 1.5 : 1
            }
        ]}>
            {iconLeft && (
                <View style={styles.iconLeft}>
                    {iconLeft}
                </View>
            )}
            <TextInput 
                value={value}
                placeholder={placeHolder} 
                style={styles.textInput} 
                placeholderTextColor='#D1D5DB'
                onChangeText={onChangeText}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                secureTextEntry={secureTextEntry}
            />
            {iconRight && (
                <TouchableOpacity onPress={onPress}>
                    {iconRight}
                </TouchableOpacity>
            )}
        </View>
    );
};

export default Input;

const styles = StyleSheet.create({
    container: {
        height: 48,
        //borderWidth: 1,
        //borderColor: '#D1D5DB',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },

    iconLeft: {
        marginRight: 8
    },

    textInput: {
        flex: 1,
        fontFamily: 'InterRegular',
        fontSize: 18,
        color: '#2C2C2C'
    }
});
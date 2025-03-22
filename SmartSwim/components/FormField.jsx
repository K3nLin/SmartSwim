import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'

const FormField = ({title, value, placeholder, handleChangeText, containerStyles, textStyles, ...props}) => {
    const [showPassword, setShowPassword] = useState(false);    

    return (
        
        <View className={`gap-y-2 ${containerStyles}`}>
            <Text className={`text-2xl ml-3 font-kavoon text-white ${textStyles}`}>{title}</Text>

            <View className="h-16 w-full px-5 rounded-2xl border-2 border-secondary bg-input_field justify-center items-center flex flex-row">
                <TextInput 
                    className="text-lg text-white font-kavoon flex-1"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={"#C1C1C1"}
                    onChangeText={handleChangeText}
                    secureTextEntry={title==='Password' && !showPassword}
                />

            </View>
        </View>
    )
}

export default FormField
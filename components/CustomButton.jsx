import { TouchableOpacity, Text, View } from 'react-native'
import React from 'react'

const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity className={`
        bg-secondary px-3 py-2 rounded-xl justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}
    `} disabled={isLoading}>
        <Text className={`${textStyles}`} style={{
            fontFamily: "Kavoon_400Regular"
        }}>{title}</Text>
    </TouchableOpacity>
    )
}

export default CustomButton
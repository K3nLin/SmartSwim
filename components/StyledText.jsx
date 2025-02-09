import { View, Text } from 'react-native'
import React from 'react'

const StyledText = ({text, textStyles=''}) => {
  return (
      <Text className={`font-kavoon ${textStyles}`}>{text}</Text>
  )
}

export default StyledText
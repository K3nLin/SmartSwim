import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HydroBuddiesLogo from '../../assets/hydrobuddies-logo.png'
import CustomButton from '../../components/CustomButton.jsx'
import StyledText from '../../components/StyledText.jsx'

const Home = () => {
  return (
    <SafeAreaView className=" h-full bg-primary items-center justify-between flex-col">
      <View className="relative h-24 w-full bg-secondary items-center flex-row">

        <View className="absolute h-24 w-24 left-1/2 -translate-x-12 flex items-center justify-center">
          <Image 
            className="-my-5 flex-1"
            source={HydroBuddiesLogo}
            resizeMode="contain"
          />
        </View>

        <View className="absolute right-3 h-20 w-20 rounded-full bg-white">
          <Image 

          />
        </View>
      </View>

      <View className="h-40 w-72 px-5 py-3 bg-secondary items-center flex">
        <StyledText 
          text="Device Pair Name:"
          textStyles="text-2xl text-white"
        />

        <StyledText 
          text="Name"
          textStyles="text-xl text-white"
        />
      </View>

      <View className="h-28 w-80 bg-secondary flex-row">
        
        <View className="border-r flex-1">
          <TextInput 
            className="text-white"
            placeholderTextColor={"#C1C1C1"}
            placeholder='Swim distance'
          />
        </View>
        <View className="border-l w-2/5">

        </View>
        
      </View>

      <CustomButton 
        title="Start"
        bgColor='bg-green-500'
        containerStyles="h-80 w-80"
        rounded='rounded-full'
        textStyles="text-7xl text-white"        
      />

    </SafeAreaView>
  )
}

export default Home
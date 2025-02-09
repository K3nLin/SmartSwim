import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import HydroBuddiesLogo from '../../assets/hydrobuddies-logo.png'
import CustomButton from '../../components/CustomButton.jsx';
import StyledText from '../../components/StyledText.jsx'
import FormField from '../../components/FormField.jsx'

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = () => {
    router.push('home')
  }

  return (
    <SafeAreaView className="bg-primary h-full px-5">
      <View className="flex h-1/4 w-full translate-y-2 z-10 justify-center items-center">
        <Image 
          source={HydroBuddiesLogo}
          className="flex-1 -mb-16 -mt-20"
          resizeMode='contain'
        />
      </View>
      <View className="bg-secondary px-5 rounded-3xl h-2/5 w-full justify-center flex justify-evenly">

        <FormField 
          title="Email"
          value={form.email}
          handleChangeText={(e) => {
            setForm({...form, email: e})
          }}
          placeholder="Enter Email"
          keyboardType="email-address"
        />

        <FormField 
          title="Password"
          value={form.password}
          handleChangeText={(e) => setForm({...form, password: e})}
          placeholder="Enter Password"
        />
      </View>

      <CustomButton
        title="Sign In"
        bgColor='bg-green-600' 
        handlePress={submit}
        containerStyles={"py-6 mt-5"}
        textStyles={"text-lg text-white"}
      />  

      <View className="py-5">
        <TouchableOpacity 
          className="justify-center items-center"
          onPress={()=>router.push('sign-up')}
        >
          <Text className="text-white font-kavoon">
            Don't have an account? Sign Up!
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

export default SignIn
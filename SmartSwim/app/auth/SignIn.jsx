import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import HydroBuddiesLogo from '../../assets/hydrobuddies-logo.png';
import CustomButton from '../../components/CustomButton.jsx';
import StyledText from '../../components/StyledText.jsx';
import FormField from '../../components/FormField.jsx';
import {BASE_URL} from '../config.js';

const SignIn = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const storeToken = async token => {
    try {
      await AsyncStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Error storing token:', error);
    }
  };

  const submit = async () => {
    try {
      if (!form.email || !form.password)
        throw new Error('Please fill out all fields!');

      console.log(`${BASE_URL}/api/login`);

      setIsSubmitting(true);

      const result = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const res = await result.json();
      if (!result.ok) {
        throw new Error(res.msg || 'Failed to Login!');
      }
      await storeToken(res.token);
      navigation.replace('Home');
    } catch (err) {
      Alert.alert(err.message, 'Please Try Again!');
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full px-5">
      <View className="flex h-1/4 w-full translate-y-2 z-10 justify-center items-center">
        <Image
          source={HydroBuddiesLogo}
          className="flex-1 -mb-16 -mt-20"
          resizeMode="contain"
        />
      </View>
      <View className="bg-secondary px-5 rounded-3xl h-2/5 w-full justify-evenly flex">
        <FormField
          title="Email"
          value={form.email}
          handleChangeText={e => {
            setForm({...form, email: e});
          }}
          placeholder="Enter Email"
          keyboardType="email-address"
        />

        <FormField
          title="Password"
          value={form.password}
          handleChangeText={e => setForm({...form, password: e})}
          placeholder="Enter Password"
        />
      </View>

      <CustomButton
        title="Sign In"
        bgColor="bg-green-600"
        handlePress={submit}
        containerStyles={'py-6 mt-5'}
        textStyles={'text-lg text-white'}
        disabled={isSubmitting}
      />

      <View className="py-5">
        <TouchableOpacity
          className="justify-center items-center"
          onPress={() => navigation.replace('SignUp')}>
          <Text className="text-white font-kavoon">
            Don't have an account? Sign Up!
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

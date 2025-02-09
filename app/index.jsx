import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, Image, Button } from 'react-native';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import HydroBuddiesLogo from '../assets/hydrobuddies-logo.png';
import CustomButton from '../components/CustomButton.jsx';
import StyledText from '../components/StyledText.jsx';

export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="bg-primary" contentContainerStyle={{ height: '100%' }}>
        <View className="justify-center items-center px-4">

          <View className="h-3/5 w-full justify-center items-center flex">
            <Image
              source={HydroBuddiesLogo}
              className="flex-1 bg-transparent"
              resizeMode="contain"
            />
          </View>
          
          <View>
            <StyledText 
              text={"Track All your Workouts!\nWith your Personal\nHydro Buddy!"}
              textStyles='text-5xl text-white text-center mb-10'
            />
          </View>
          
          <CustomButton 
            title="Continue with Email" 
            handlePress={() => router.push('sign-in')}
            containerStyles="w-full h-20"
            textStyles="text-xl text-white"

          />
        </View>
      </ScrollView>

      <StatusBar style='light'/>
    </SafeAreaView>
  );
}
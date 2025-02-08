import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, Image, Button } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FONT_APP } from './config.js';
import HydroBuddiesLogo from '../assets/hydrobuddies-logo.png';
import CustomButton from '../components/CustomButton.jsx';

export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="bg-primary" contentContainerStyle={{ height: '100%' }}>
        <View className="justify-center items-center px-4">

          <View className="h-3/5 w-full justify-center items-center flex">
            <Image
              source={HydroBuddiesLogo}
              // className="h-full w-full max-w-sm bg-white justify-center items-center"
              className="flex-1 bg-transparent"
              resizeMode="contain"
            />
          </View>
          
          <View>
            <Text className="text-5xl text-white text-center mb-10" style={{
              fontFamily: FONT_APP
            }}>
              Track All your Workouts! {'\n'} With your Personal {'\n'} Hydro Buddy!
            </Text>
          </View>
          
          <CustomButton 
            title="Continue with Email" 
            handlePress={() => {}}
            containerStyles="w-full h-20"
            textStyles="text-xl text-white"

          />
        </View>
      </ScrollView>

      <StatusBar style='light'/>
    </SafeAreaView>
  );
}
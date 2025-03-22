import {useState, useEffect} from 'react';
import {Text, View, ScrollView, Image, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {loadCustomFonts} from './utils/fontLoader';
import HydroBuddiesLogo from './assets/hydrobuddies-logo.png';
import CustomButton from './components/CustomButton.jsx';
import StyledText from './components/StyledText.jsx';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from './app/(auth)/sign-in.jsx';

const Stack = createStackNavigator();

const loadFonts = async () => {
  await Font.loadAsync({
    Kavoon_400Regular: require('./assets/fonts/Kavoon-Regular.ttf'),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const fetchFonts = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };
    fetchFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const LandingScreen = ({navigation}) => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        className="bg-primary"
        contentContainerStyle={{height: '100%'}}>
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
              text={
                'Track All your Workouts!\nWith your Personal\nHydro Buddy!'
              }
              textStyles="text-5xl text-white text-center mb-10"
            />
          </View>

          <CustomButton
            title="Continue with Email"
            handlePress={() => navigation.navigate('SignIn')}
            containerStyles="w-full h-20"
            textStyles="text-xl text-white"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

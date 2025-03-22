import './global.css';

import {View, Text} from 'react-native';

import {useState, useEffect, StrictMode} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LandingScreen from './app/LandingScreen.jsx';
import SignInScreen from './app/auth/SignIn.jsx';
import HomeScreen from './app/tabs/Home.jsx';

import StyledText from './components/StyledText.jsx';

const Stack = createStackNavigator();

export default function App() {
  return (
    <StrictMode>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StrictMode>
  );
}
// <View className="= bg-black">
//   <StyledText style={'text-6xl text-white'}>Hello, World!</StyledText>
// </View>

// <Stack.Navigator>
//   <Stack.Screen name="Landing" component={LandingScreen} />
//   <Stack.Screen name="SignIn" component={SignInScreen} />
// </Stack.Navigator>
/* <NavigationContainer>
<Stack.Navigator initialRouteName="Landing">
<Stack.Screen name="Landing" component={LandingScreen} />
<Stack.Screen name="SignIn" component={SignInScreen} />
</Stack.Navigator>
</NavigationContainer> */

// const [fontsLoaded, setFontsLoaded] = useState(false);

// useEffect(() => {
//   const fetchFonts = async () => {
//     await loadCustomFonts();
//     setFontsLoaded(true);
//   };
//   fetchFonts();
// }, []);

// if (!fontsLoaded) {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <ActivityIndicator size="large" color="#ffffff" />
//     </View>
//   );
// }

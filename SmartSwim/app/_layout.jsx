import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import SplashScreen from "react-native-splash-screen";
import { loadCustomFonts } from "../utils/fontLoader";
import HomeScreen from "../screens/HomeScreen";
import AuthScreen from "../screens/AuthScreen";

const Stack = createStackNavigator();

const RootLayout = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFontsAndHideSplash = async () => {
      try {
        await loadCustomFonts(); // Load fonts
        setFontsLoaded(true);
        SplashScreen.hide(); // Hide splash screen
      } catch (error) {
        console.error("Font loading error:", error);
      }
    };

    loadFontsAndHideSplash();
  }, []);

  if (!fontsLoaded) return null; // Prevent rendering before fonts load

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootLayout;

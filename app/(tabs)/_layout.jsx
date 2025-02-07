import { View, Text, Image } from 'react-native'
import { Tabs, Redirect, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import HomeIcon from '../../assets/home.png';
import HistoryIcon from '../../assets/history.png';
import { SMALL_FONT, NORM_FONT, HEADER_FONT } from '../config.js';
import * as cnfg from '../config.js';

const TabIcon = ({icon, color, name, focused}) => {
  return <View>
    <Image
      source={icon}
      resizeMode="contain"
      tintColor={color}
      className={focused ? "w-7 h-7" : "w-6 h-6"}
    />
  </View>
}

const TabLabel = ({ name, focused }) => {
  return (<Text
      style={{
        color: focused ? cnfg.TAB_ACTIVE_TINT : cnfg.TAB_INACTIVE_TINT,
        fontSize: SMALL_FONT,
        fontWeight: focused ? 'bold' : 'normal',
        fontFamily: 'Kavoon_400Regular'
      }}
    >
      {name}
    </Text>
  );
};

const TabsLayout = () => {

  const [fontsLoaded, error] = useFonts({
    "Kavoon_400Regular": require("../../node_modules/@expo-google-fonts/kavoon/Kavoon_400Regular.ttf"),
  })

  useEffect(() =>{
    if(error) throw error;

    if(fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if(!fontsLoaded && !error) return null;

  return (
    
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#FFA001',
          tabBarInactiveTintColor: '#FFFFFF',
          tabBarStyle: {
            backgroundColor: cnfg.TAB_BACKGROUND_COLOR
          }
        }}
      >
          <Tabs.Screen
            name="home"
            options={{
              title: 'Home',
              headerShown: false,
              tabBarLabel: ({ focused }) => (
                <TabLabel
                  name="Home"
                  focused={focused}
                />
              ),
              tabBarIcon: ({color, focused}) => (
                <TabIcon
                  icon={HomeIcon}
                  color={color}
                  name="Home"
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="workout-history"
            options={{
              title: 'History',
              headerShown: false,
              tabBarLabel: ({ focused }) => (
                <TabLabel
                  name="History"
                  focused={focused}
                />
              ),
              tabBarIcon: ({color, focused}) => (
                <TabIcon
                  icon={HistoryIcon}
                  color={color}
                  name="History"
                  focused={focused}
                />
              ),
            }}
          />
      </Tabs>
    </>
  )
}

export default TabsLayout
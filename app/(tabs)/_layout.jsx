import { View, Text } from 'react-native'
import { Tabs, Redirect } from 'expo-router';
import HomeIcon from '../../assets/home-alt-svgrepo-com.svg';
import { SMALL_FONT, NORM_FONT, HEADER_FONT } from '../config.js';

const TabsLayout = () => {
  return (
    
    <>
      <Tabs>
          <Tabs.Screen
            name="home"
            options={{
              title: 'Home',
              headerShown: false,
              tabBarLabel: ({ focused }) => (
                <Text
                  style={{
                    fontSize: focused ? NORM_FONT : SMALL_FONT,
                    fontWeight: focused ? "bold" : "normal",
                  }}
                >
                  Home
                </Text>
              ),
              tabBarIcon: ({ color, size, focused}) => (
                <HomeIcon 
                  width={focused ? size * 1.2 : size} height={focused ? size * 1.2 : size} fill={color} 
                />
              ),
            }}
          />
      </Tabs>
    </>
  )
}

export default TabsLayout
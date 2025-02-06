import { View, Text } from 'react-native'
import { Tabs, Redirect } from 'expo-router';
import HomeIcon from '../../assets/home-alt-svgrepo-com.svg';

const TabsLayout = () => {
  return (
    
    <>
      <Tabs>
          <Tabs.Screen
            name="home"
            options={{
              title: 'Home',
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <HomeIcon width={size } height={size} fill={color} />
              )
            }}
          />
      </Tabs>
    </>
  )
}

export default TabsLayout
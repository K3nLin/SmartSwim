import {View, Text, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {useEffect} from 'react';
import HomeIcon from '../../assets/home.png';
import HistoryIcon from '../../assets/history.png';
import {SMALL_FONT, NORM_FONT, HEADER_FONT} from '../config.js';
import * as cnfg from '../config.js';
import {Ionicons} from 'react-native-vector-icons';

import HomeScreen from './Home.jsx';
import WorkoutHistoryScreen from './WorkoutHistory.jsx';

const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = HomeIcon;
          } else if (route.name === 'Workout History') {
            iconSource = HistoryIcon;
          }

          return (
            <Image
              source={iconSource}
              style={{
                width: focused ? 30 : 25,
                height: focused ? 30 : 25,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          );
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: cnfg.TAB_BUTTON_ACTIVE_COLOR,
        tabBarInactiveTintColor: '#FFFFFF',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: cnfg.TAB_BACKGROUND_COLOR,
          borderTopWidth: 0,
        },
      })}
      tabBarStyle>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Workout History" component={WorkoutHistoryScreen} />
    </Tab.Navigator>
  );
};

export default TabsNavigator;

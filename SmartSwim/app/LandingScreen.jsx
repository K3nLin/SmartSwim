import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';

import HydroBuddiesLogo from '../assets/hydrobuddies-logo.png';
import {createStaticNavigation, useNavigation} from '@react-navigation/native';
import CustomButton from '../components/CustomButton.jsx';
import StyledText from '../components/StyledText.jsx';

import React from 'react';

const LandingScreen = () => {
  const navigation = useNavigation();
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
            <StyledText textStyle="text-5xl text-white text-center mb-10">
              {'Track All your Workouts!\nWith your Personal\nHydro Buddy!'}
            </StyledText>
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

export default LandingScreen;

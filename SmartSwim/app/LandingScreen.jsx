import {SafeAreaView} from 'react-native-safe-area-context';
// import {Text, View, ScrollView, Image, ActivityIndicator} from 'react-native';

import HydroBuddiesLogo from '../assets/hydrobuddies-logo.png';

import CustomButton from '../components/CustomButton.jsx';
import StyledText from '../components/StyledText.jsx';

import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const LandingScreen = () => {
  console.log('SUI');
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, World!</Text>
    </View>

    // <SafeAreaView className="bg-primary h-full">
    //   <ScrollView
    //     className="bg-primary"
    //     contentContainerStyle={{height: '100%'}}>
    //     <View className="justify-center items-center px-4">
    //       <View className="h-3/5 w-full justify-center items-center flex">
    //         <Image
    //           source={HydroBuddiesLogo}
    //           className="flex-1 bg-transparent"
    //           resizeMode="contain"
    //         />
    //       </View>

    //       <View>
    //         <StyledText
    //           text={
    //             'Track All your Workouts!\nWith your Personal\nHydro Buddy!'
    //           }
    //           textStyles="text-5xl text-white text-center mb-10"
    //         />
    //       </View>

    //       <CustomButton
    //         title="Continue with Email"
    //         handlePress={() => navigation.navigate('SignIn')}
    //         containerStyles="w-full h-20"
    //         textStyles="text-xl text-white"
    //       />
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
  );
};

export default LandingScreen;

import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, View, ScrollView, Image, ActivityIndicator} from 'react-native';

import HydroBuddiesLogo from '../assets/hydrobuddies-logo.png';

import CustomButton from '../components/CustomButton.jsx';
import StyledText from '../components/StyledText.jsx';

import React from 'react';

const LandingScreen = () => {
  return (
    <>
      <Text className="font-kavoon text-4xl">Sewey</Text>
      <StyledText textStyle={'text-6xl'}>Hello, World!</StyledText>
      <StyledText textStyle={' mb-10'}>
        Track All your Workouts!With your PersonalHydro Buddy!
      </StyledText>
    </>

    // <SafeAreaView className="bg-primary flex-1">
    //   <ScrollView className="bg-primary flex-1">
    //     <View className="flex flex-col justify-center items-center px-4 w-full">
    //       <View
    //         id="logo-container"
    //         className="h-3/5 w-full justify-center items-center">
    //         <Image
    //           source={HydroBuddiesLogo}
    //           className="bg-transparent"
    //           resizeMode="contain"
    //         />
    //       </View>

    //       <StyledText style={'text-5xl text-white text-center mb-10'}>
    //         {'Track All your Workouts!\nWith your Personal\nHydro Buddy!'}
    //       </StyledText>

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

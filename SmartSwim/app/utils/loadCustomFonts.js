import * as Font from 'react-native-fonts';

export const loadCustomFonts = async () => {
  await Font.loadAsync({
    Kavoon_Regular: require('../../assets/fonts/Kavoon-Regular.ttf'),
  });
};

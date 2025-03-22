import * as Font from "react-native-fonts";

export const loadCustomFonts = async () => {
  await Font.loadAsync({
    Kavoon_400Regular: require("../assets/fonts/Kavoon_400Regular.ttf"),
  });
};

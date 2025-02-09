import { View, Text, Image, TextInput } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dropdown } from "react-native-element-dropdown";
import HydroBuddiesLogo from "../../assets/hydrobuddies-logo.png";
import CustomButton from "../../components/CustomButton.jsx";
import StyledText from "../../components/StyledText.jsx";
import AntDesign from "@expo/vector-icons/AntDesign";

const unitOptions = [
  { label: "m", value: "m" },
  { label: "ft", value: "ft" },
];

const Home = () => {
  const [workoutDistance, setworkoutDistance] = useState({
    distance: "",
    units: "m",
  });

  return (
    <SafeAreaView className="h-full bg-primary items-center justify-between flex-col">
      <View className="relative h-24 w-full bg-secondary items-center flex-row">
        <View className="absolute h-24 w-24 left-1/2 -translate-x-12 flex items-center justify-center">
          <Image
            className="-my-5 flex-1"
            source={HydroBuddiesLogo}
            resizeMode="contain"
          />
        </View>

        <View className="absolute right-3 h-20 w-20 rounded-full bg-white">
          <Image />
        </View>
      </View>

      <View className="h-40 w-72 px-5 py-3 rounded-3xl bg-secondary items-center flex">
        <StyledText text="Device Pair Name:" textStyles="text-2xl text-white" />
        <StyledText text="Name" textStyles="text-xl text-white" />
      </View>

      <View className="h-28 w-80 rounded-l-3xl bg-secondary flex-row">
        <View className="p-4 border-r justify-center items-center flex-1">
          <TextInput
            className="text-4xl h-full w-full text-right text-white font-kavoon bg-black"
            placeholderTextColor={"#C1C1C1"}
            placeholder="Distance"
            onChangeText={(e) =>
              setworkoutDistance({ ...workoutDistance, distance: e })
            }
          />
        </View>

        {/* Dropdown */}
        <View className="border-l w-2/5 items-center justify-center">
        <Dropdown
          style={{
            backgroundColor: "#FFFFFF",
            borderWidth: 1,
            borderColor: "#CCC",
            paddingHorizontal: 30,
            borderRadius: 8,
            height: 50,
            justifyContent: "center",
          }}
          data={unitOptions}
          maxHeight={150}
          labelField="label"
          valueField="value"
          value={workoutDistance.units} // ✅ Ensures selected value is displayed
          onChange={(item) => {
            console.log("Current selected unit:", workoutDistance.units);
            setworkoutDistance((prev) => ({
              ...prev,
              units: item.value, // ✅ Update state correctly
            }));
          }}
          placeholder="Select unit" // ✅ Prevents placeholder conflicts
          placeholderStyle={{ color: "#888" }} // ✅ Avoids overlapping selected value
        />


        </View>
      </View>

      <CustomButton
        title="Start"
        bgColor="bg-green-500"
        containerStyles="h-80 w-80"
        rounded="rounded-full"
        textStyles="text-7xl text-white"
      />
    </SafeAreaView>
  );
};

export default Home;

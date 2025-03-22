import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dropdown } from "react-native-element-dropdown";
import HydroBuddiesLogo from "../../assets/hydrobuddies-logo.png";
import CustomButton from "../../components/CustomButton.jsx";
import StyledText from "../../components/StyledText.jsx";
import AntDesign from "@expo/vector-icons/AntDesign";

import BleComponent from "../../components/BLEComponent.jsx";

const unitOptions = [
  { label: "m", value: "m" },
  { label: "ft", value: "ft" },
];

const Home = () => {
  const [workoutDistance, setworkoutDistance] = useState({
    distance: "",
    units: "m",
  });

  const [connectionStatus, setConnectionStatus] = useState("None");
  const [started, setStarted] = useState(false);
  const sendStartSignalRef = useRef(null);
  const sendStopSignalRef = useRef(null);
  const readDataRef = useRef(null);
  const stopReadDataRef = useRef(null);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
          <StyledText
            text="Device Pair Name:"
            textStyles="text-2xl text-white"
          />
          <StyledText text={connectionStatus} textStyles="text-xl text-white" />
        </View>

        <BleComponent
          setConnectionStatus={setConnectionStatus}
          sendStartSignalRef={sendStartSignalRef}
          sendStopSignalRef={sendStopSignalRef}
          readDataRef={readDataRef}
          stopReadDataRef={stopReadDataRef}
        />

        <View className="h-28 w-80 rounded-3xl bg-secondary flex-row">
          <View className="px-2 py-4 border-r border-input_border justify-center items-center flex-1">
            <TextInput
              className="text-4xl h-full w-full text-right text-white font-kavoon"
              placeholderTextColor={"#C1C1C1"}
              placeholder="Distance"
              keyboardType="number-pad"
              onChangeText={(e) => {
                setworkoutDistance({ ...workoutDistance, distance: e });
              }}
            />
          </View>

          <View className="border-l px-2 py-4 w-2/5 items-center justify-center flex-row">
            <Dropdown
              style={{
                flex: 1,
                paddingHorizontal: 15,
                height: "100%",
              }}
              data={unitOptions}
              maxHeight={150}
              labelField="label"
              valueField="value"
              value={workoutDistance.units}
              onChange={(item) => {
                console.log("Selected unit:", item.value);
                setworkoutDistance((prev) => ({
                  ...prev,
                  units: item.value,
                }));
              }}
              containerStyle={{
                backgroundColor: "#332958",
                borderWidth: 1,
                borderColor: "#2A224B",
              }}
              itemContainerStyle={{
                backgroundColor: "#332958",
              }}
              itemTextStyle={{
                color: "white",
                fontFamily: "Kavoon_400Regular",
              }}
              selectedTextStyle={{
                marginBottom: 4,
                fontSize: 35,
                color: "white",
                fontFamily: "Kavoon_400Regular",
              }}
              activeColor="#4E3F92"
            />
          </View>
        </View>

        <CustomButton
          title="Start"
          bgColor="bg-green-500"
          containerStyles={`h-80 w-80 ${started ? "hidden" : ""}`}
          rounded="rounded-full"
          textStyles="text-7xl text-white"
          handlePress={() => {
            if (!workoutDistance.distance) {
              Alert.alert("Error", "Please enter a distance.");
              return;
            }

            console.log("Workout Distance:", workoutDistance);

            if (sendStartSignalRef.current) {
              sendStartSignalRef.current();
            } else {
              Alert.alert("Error", "BLE device not connected.");
              return;
            }

            setStarted(true);

            readDataRef.current?.();
          }}
        />

        <CustomButton
          title="Stop"
          bgColor="bg-red-500"
          containerStyles={`h-80 w-80 ${!started ? "hidden" : ""}`}
          rounded="rounded-full"
          textStyles="text-7xl text-white"
          handlePress={() => {
            if (!started) return;

            if (sendStopSignalRef.current) {
              sendStopSignalRef.current();
            } else {
              Alert.alert("Error", "BLE device not connected.");
              return;
            }

            setStarted(false);

            stopReadDataRef.current?.();
          }}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Home;

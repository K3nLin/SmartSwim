import React, { useEffect, useState } from "react";
import { View, Text, Button, PermissionsAndroid, Platform, Alert } from "react-native";
import CustomButton from "./CustomButton.jsx";
import bleManager from "../services/BLEManager"; // Import the BLE manager

const BleComponent = ({ setConnectionStatus, sendStartSignalRef }) => {
  const [device, setDevice] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    requestPermissions();
  }, []);

  // Request necessary Bluetooth permissions (Android 12+ requires more permissions)
  const requestPermissions = async () => {
    if (Platform.OS === "android" && Platform.Version >= 23) {
      try {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ]);
      } catch (err) {
        console.warn("Permission request error:", err);
      }
    }
  };

  // Scan for BLE devices
  const scanAndConnect = () => {
    bleManager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        console.log("Scan error:", error);
        return;
      }

      console.log("Scanned Device:", scannedDevice.name, scannedDevice.id);

      if (scannedDevice.name === "ESP32-BLE") {
        bleManager.stopDeviceScan();
        connectToDevice(scannedDevice);
      }
    });
  };

  // Connect to the selected BLE device
  const connectToDevice = async (device) => {
    try {
      const connectedDevice = await device.connect();
      await connectedDevice.discoverAllServicesAndCharacteristics();
      setDevice(connectedDevice);
      setIsConnected(true);
      setConnectionStatus(device.name || "Connected!");
      console.log("Connected to ESP32:", connectedDevice.id);
    } catch (error) {
      console.log("Connection error:", error);
      setConnectionStatus("Error connecting");
      Alert.alert("Connection Failed", "Could not connect to ESP32.");
    }
  };

  // Send data to ESP32
  const sendStartSignal = async () => {
    if (!device) {
      Alert.alert("Error", "Device not connected");
      return;
    }

    const serviceUUID = "12345678-1234-5678-1234-56789abcdef0"; // Replace with your ESP32 Service UUID
    const startSignalUUID = "abcdef02-1234-5678-1234-56789abcdef0"; // Replace with Start Signal Characteristic UUID

    try {
      await device.writeCharacteristicWithResponseForService(
        serviceUUID,
        startSignalUUID,
        Buffer.from("start").toString("base64")
      );
      console.log("Start signal sent!");
      Alert.alert("Success", "Start signal sent to ESP32.");
    } catch (error) {
      console.log("Write error:", error);
      Alert.alert("Error", "Failed to send start signal.");
    }
  };

  if (sendStartSignalRef) {
    sendStartSignalRef.current = sendStartSignal;
  }

    return (
        <CustomButton 
            title="Connect Device"
            containerStyles={"h-12 w-50"}
            textStyles={"text-white"}
            bgColor="bg-green-500"
            handlePress={scanAndConnect}
        />
    );
};

export default BleComponent;

// <View style={{ padding: 20 }}>
//   <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>BLE with ESP32</Text>
//   <Button title="Scan for Devices" onPress={scanAndConnect} />
//   {isConnected && (
//     <View style={{ marginTop: 10 }}>
//       <Button title="Send Data to ESP32" onPress={sendData} />
//     </View>
//   )}
// </View>
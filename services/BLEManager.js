import React, { useEffect, useState } from "react";
import { View, Text, Button, PermissionsAndroid, Platform } from "react-native";
import { BleManager } from "react-native-ble-plx";

const bleManager = new BleManager();

const BleComponent = () => {
  const [device, setDevice] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === "android" && Platform.Version >= 23) {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      ]);
    }
  };

  const scanAndConnect = () => {
    bleManager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        console.log("Scan error:", error);
        return;
      }

      console.log("Scanned Device:", scannedDevice.name);

      if (scannedDevice.name === "ESP32-BLE") {
        bleManager.stopDeviceScan();
        connectToDevice(scannedDevice);
      }
    });
  };

  const connectToDevice = async (device) => {
    try {
      const connectedDevice = await device.connect();
      await connectedDevice.discoverAllServicesAndCharacteristics();
      setDevice(connectedDevice);
      setIsConnected(true);
      console.log("Connected to ESP32!");
    } catch (error) {
      console.log("Connection error:", error);
    }
  };

  const sendData = async () => {
    if (!device) return;
    const serviceUUID = "your-service-uuid"; // Change this to your ESP32 BLE Service UUID
    const characteristicUUID = "your-characteristic-uuid"; // Change this to your Characteristic UUID

    try {
      await device.writeCharacteristicWithResponseForService(
        serviceUUID,
        characteristicUUID,
        Buffer.from("Hello ESP32!").toString("base64")
      );
      console.log("Data sent to ESP32!");
    } catch (error) {
      console.log("Write error:", error);
    }
  };

  return (
    <View>
      <Text>BLE with ESP32</Text>
      <Button title="Scan for Devices" onPress={scanAndConnect} />
      {isConnected && <Button title="Send Data" onPress={sendData} />}
    </View>
  );
};

export default BleComponent;

import React, { useEffect, useState } from "react";
import { View, Text, Button, PermissionsAndroid, Platform, Alert } from "react-native";
import bleManager from "../services/BLEManager"; // Import the BLE manager

const BleComponent = () => {
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

      if (scannedDevice.name === "ESP32-BT-Slave") {
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
      console.log("Connected to ESP32:", connectedDevice.id);
    } catch (error) {
      console.log("Connection error:", error);
      Alert.alert("Connection Failed", "Could not connect to ESP32.");
    }
  };

  // Send data to ESP32
  const sendData = async () => {
    if (!device) return;

    const serviceUUID = "your-service-uuid"; // Replace with ESP32 Service UUID
    const characteristicUUID = "your-characteristic-uuid"; // Replace with ESP32 Characteristic UUID

    try {
      await device.writeCharacteristicWithResponseForService(
        serviceUUID,
        characteristicUUID,
        Buffer.from("Hello ESP32!").toString("base64")
      );
      console.log("Data sent to ESP32!");
      Alert.alert("Success", "Data sent to ESP32.");
    } catch (error) {
      console.log("Write error:", error);
      Alert.alert("Error", "Failed to send data.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>BLE with ESP32</Text>
      <Button title="Scan for Devices" onPress={scanAndConnect} />
      {isConnected && (
        <View style={{ marginTop: 10 }}>
          <Button title="Send Data to ESP32" onPress={sendData} />
        </View>
      )}
    </View>
  );
};

export default BleComponent;

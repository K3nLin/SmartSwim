import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  PermissionsAndroid,
  Platform,
  Alert,
} from "react-native";
import { Buffer } from "buffer";
import CustomButton from "./CustomButton.jsx";
import bleManager from "../services/BLEManager";

const BleComponent = ({
  setConnectionStatus,
  sendStartSignalRef,
  sendStopSignalRef,
  readDataRef,
  stopReadDataRef,
}) => {
  const [device, setDevice] = useState(null);
  const [subscription, setSubscription] = useState(null);

  const SERVICE_UUID = "12345678-1234-5678-1234-56789abcdef0";
  const CHARACTERISTIC_UUID = "abcdef01-1234-5678-1234-56789abcdef0";
  const START_SIGNAL_UUID = "abcdef02-1234-5678-1234-56789abcdef0";
  const STOP_SIGNAL_UUID = "abcdef03-1234-5678-1234-56789abcdef0";

  useEffect(() => {
    requestPermissions();
  }, []);

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
      setConnectionStatus(device.name || "Connected!");
      console.log("Connected to ESP32:", connectedDevice.id);
    } catch (error) {
      console.log("Connection error:", error);
      setConnectionStatus("Error connecting");
      Alert.alert("Connection Failed", "Could not connect to ESP32.");
    }
  };

  const sendSignal = async (startStopUUID, encodedMessage) => {
    try {
      await device.writeCharacteristicWithResponseForService(
        SERVICE_UUID,
        startStopUUID,
        encodedMessage
      );
      startStopUUID === START_SIGNAL_UUID
        ? console.log("Start signal sent!")
        : console.log("Stop signal sent!");
      Alert.alert(
        "Success",
        `${
          startStopUUID === START_SIGNAL_UUID ? "Start" : "Stop"
        } signal sent to ESP32.`
      );
    } catch (error) {
      throw error;
    }
  };

  // Send data to ESP32
  const sendStartSignal = async () => {
    if (!device) {
      Alert.alert("Error", "Device not connected");
      return;
    }

    try {
      sendSignal(START_SIGNAL_UUID, Buffer.from("start").toString("base64"));
    } catch (err) {
      console.log("Write error:", err);
      Alert.alert("Error", "Failed to send start signal.");
    }
  };

  const sendStopSignal = async () => {
    if (!device) {
      Alert.alert("Error", "Device not connected");
      return;
    }

    try {
      sendSignal(STOP_SIGNAL_UUID, Buffer.from("stop").toString("base64"));
    } catch (err) {
      console.log("Write error:", err);
      Alert.alert("Error", "Failed to send stop signal.");
    }
  };

  const readData = async () => {
    if (!device) {
      console.log("No device connected.");
      return;
    }

    try {
      const serviceUUID = SERVICE_UUID;
      const characteristicUUID = CHARACTERISTIC_UUID;

      const newSubscription = device.monitorCharacteristicForService(
        serviceUUID,
        characteristicUUID,
        (error, characteristic) => {
          if (error) {
            console.log("Error reading data:", error);
            return;
          }

          console.log(characteristic);

          // Convert received data to string
          const receivedData = Buffer.from(
            characteristic.value,
            "base64"
          ).toString();
          console.log("Received (raw string):", receivedData);

          try {
            const jsonData = JSON.parse(receivedData);
            console.log("Parsed JSON:", jsonData);
            // Store GPS & acceleration data for distance calculations
          } catch (err) {
            console.error("JSON Parse Error:", err);
          }
        }
      );

      setSubscription(newSubscription);
    } catch (error) {
      console.log("Bluetooth Read Error:", error);
    }
  };

  const stopReadData = async () => {
    try {
      if (subscription) {
        subscription.remove();
        setSubscription(null); // Clear subscription after removing
        console.log("Stopped reading data.");
      }
    } catch (err) {
      console.log("No active subscription to stop.", err);
    }
  };

  // Start and stop references
  if (sendStartSignalRef) sendStartSignalRef.current = sendStartSignal;
  if (sendStopSignalRef) sendStopSignalRef.current = sendStopSignal;
  if (readDataRef) readDataRef.current = readData;
  if (stopReadDataRef) stopReadDataRef.current = stopReadData;

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
